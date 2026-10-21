<?php
/**
 * Copy this file to contact-config.php and fill in the real SMTP password.
 * contact-config.php is gitignored and blocked from direct web access.
 */
return [
    'smtp_host' => 'mail.zaimsholding.com',
    // 587 + tls (STARTTLS). If blocked on your host, try port 465 + 'ssl'.
    'smtp_port' => 587,
    'smtp_secure' => 'tls', // 'tls' or 'ssl'
    'smtp_user' => 'contactform@zaimsholding.com',
    'smtp_pass' => 'REPLACE_WITH_MAILBOX_PASSWORD',
    'mail_from' => 'contactform@zaimsholding.com',
    'mail_from_name' => 'Zaims Holding Contact Form',
    'mail_to' => 'info@zaimsholding.com',
];
