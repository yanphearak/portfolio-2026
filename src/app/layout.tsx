import type { Metadata, Viewport } from "next";
import { Overpass } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const sans = Overpass({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seoTitle,
  description: site.seoDescription,
  openGraph: {
    title: site.seoTitle,
    description: site.seoDescription,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14202c" },
    { media: "(prefers-color-scheme: light)", color: "#edf0f3" },
  ],
};

/**
 * Applies the saved (or system) theme before first paint so the page never
 * flashes the wrong colours. Runs blocking, on purpose — it is three lines.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", stored || system);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={sans.variable}>{children}</body>
    </html>
  );
}
