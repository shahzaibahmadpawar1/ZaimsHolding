import type { Metadata } from "next";
import {
  Outfit,
  Source_Sans_3,
  Newsreader,
  Barlow,
  Barlow_Condensed,
  Inter,
  Sora,
  Space_Mono,
} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteToc from "@/components/SiteToc";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

/** NexGen — nxgens.com */
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

/** Dammam Laser — dammamlaser.com */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/** Edge Steel — edgesteelksa.com */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Zaims Holding — Industrial Companies for Saudi Infrastructure",
    template: "%s | Zaims Holding",
  },
  description:
    "Zaims Holding owns and operates complementary construction and fabrication companies across Saudi Arabia — NexGen Build, Dammam Laser CNC, and Edge Steel KSA.",
  icons: {
    icon: [{ url: "/assets/logos/favicon.png", type: "image/png" }],
    apple: [{ url: "/assets/logos/favicon.png", type: "image/png" }],
    shortcut: ["/assets/logos/favicon.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sourceSans.variable} ${newsreader.variable} ${barlow.variable} ${barlowCondensed.variable} ${inter.variable} ${sora.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <SiteToc />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
