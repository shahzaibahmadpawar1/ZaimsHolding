<?php
/**
 * Contact form SMTP endpoint for the static Apache export.
 * POST JSON: name, organization, role?, email, inquiryType, message, website? (honeypot)
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/contact-config.php';
if (!is_readable($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail is not configured on this server.']);
    exit;
}

/** @var array<string, mixed> $config */
$config = require $configPath;

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    // Fallback for FormData / application/x-www-form-urlencoded
    $data = $_POST;
}

function field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function respond(int $status, bool $ok, string $error = ''): void
{
    http_response_code($status);
    $payload = ['ok' => $ok];
    if ($error !== '') {
        $payload['error'] = $error;
    }
    echo json_encode($payload);
    exit;
}

// Honeypot — bots fill this; humans leave it empty
if (field($data, 'website') !== '') {
    respond(200, true);
}

$name = field($data, 'name');
$organization = field($data, 'organization');
$role = field($data, 'role');
$email = field($data, 'email');
$inquiryType = field($data, 'inquiryType');
$message = field($data, 'message');

$allowedTypes = ['Partnership', 'Investment', 'Media', 'General'];

if ($name === '' || mb_strlen($name) > 120) {
    respond(400, false, 'Please enter a valid name.');
}
if ($organization === '' || mb_strlen($organization) > 160) {
    respond(400, false, 'Please enter a valid organization.');
}
if ($role !== '' && mb_strlen($role) > 120) {
    respond(400, false, 'Role is too long.');
}
if ($email === '' || mb_strlen($email) > 160 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, 'Please enter a valid email address.');
}
if (!in_array($inquiryType, $allowedTypes, true)) {
    respond(400, false, 'Please choose a valid inquiry type.');
}
if ($message === '' || mb_strlen($message) > 5000) {
    respond(400, false, 'Please enter a message (up to 5000 characters).');
}

// Simple per-IP rate limit: max 5 submissions / 10 minutes
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = sys_get_temp_dir() . '/zaims-contact-rate';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/' . hash('sha256', $ip) . '.json';
$now = time();
$window = 600;
$maxHits = 5;
$hits = [];
if (is_readable($rateFile)) {
    $decoded = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($decoded)) {
        $hits = array_values(array_filter($decoded, static function ($t) use ($now, $window) {
            return is_int($t) && ($now - $t) < $window;
        }));
    }
}
if (count($hits) >= $maxHits) {
    respond(429, false, 'Too many submissions. Please try again in a few minutes.');
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

$smtpHost = (string) ($config['smtp_host'] ?? '');
$smtpPort = (int) ($config['smtp_port'] ?? 587);
$smtpSecure = (string) ($config['smtp_secure'] ?? 'tls');
$smtpUser = (string) ($config['smtp_user'] ?? '');
$smtpPass = (string) ($config['smtp_pass'] ?? '');
$mailFrom = (string) ($config['mail_from'] ?? $smtpUser);
$mailFromName = (string) ($config['mail_from_name'] ?? 'Zaims Holding Contact Form');
$mailTo = (string) ($config['mail_to'] ?? '');

if ($smtpHost === '' || $smtpUser === '' || $smtpPass === '' || $mailTo === '') {
    respond(500, false, 'Mail is not configured on this server.');
}

$safe = static function (string $value): string {
    return str_replace(["\r", "\n"], ' ', $value);
};

$bodyLines = [
    'New inquiry from the Zaims Holding website contact form.',
    '',
    'Name: ' . $name,
    'Organization: ' . $organization,
    'Role: ' . ($role !== '' ? $role : '—'),
    'Email: ' . $email,
    'Inquiry type: ' . $inquiryType,
    '',
    'Message:',
    $message,
    '',
    '---',
    'IP: ' . $ip,
    'Time: ' . gmdate('Y-m-d H:i:s') . ' UTC',
];

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->Port = $smtpPort;
    if ($smtpSecure === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($mailFrom, $mailFromName);
    $mail->addAddress($mailTo);
    $mail->addReplyTo($email, $safe($name));

    $mail->Subject = $safe('[Inquiry] ' . $inquiryType . ' — ' . $name);
    $mail->isHTML(false);
    $mail->Body = implode("\n", $bodyLines);

    $mail->send();
    respond(200, true);
} catch (MailException $e) {
    error_log('Contact form mail error: ' . $mail->ErrorInfo);
    respond(500, false, 'Could not send your message. Please try again or email us directly.');
}
