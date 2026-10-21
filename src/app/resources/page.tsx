import Link from "next/link";

/** Static-friendly redirect (config redirects are unsupported with `output: "export"`). */
export default function ResourcesRedirect() {
  return (
    <main className="mx-auto max-w-lg px-6 py-24 text-center">
      <meta httpEquiv="refresh" content="0;url=/news/" />
      <p className="text-mono-70">
        This page has moved to{" "}
        <Link href="/news/" className="font-semibold text-brand-primary underline">
          News
        </Link>
        .
      </p>
      <script dangerouslySetInnerHTML={{ __html: 'location.replace("/news/")' }} />
    </main>
  );
}
