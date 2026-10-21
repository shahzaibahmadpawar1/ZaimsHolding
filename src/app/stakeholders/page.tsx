import Link from "next/link";

/** Static-friendly redirect (config redirects are unsupported with `output: "export"`). */
export default function StakeholdersRedirect() {
  return (
    <main className="mx-auto max-w-lg px-6 py-24 text-center">
      <meta httpEquiv="refresh" content="0;url=/investors/" />
      <p className="text-mono-70">
        This page has moved to{" "}
        <Link href="/investors/" className="font-semibold text-brand-primary underline">
          Investors
        </Link>
        .
      </p>
      <script dangerouslySetInnerHTML={{ __html: 'location.replace("/investors/")' }} />
    </main>
  );
}
