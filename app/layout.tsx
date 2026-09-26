import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COMB / 001 — The Entanglement",
  description: "An experimental artwork about memories that overlap, linger, and cannot be entirely separated.",
  icons: {
    icon: `${process.env.GITHUB_PAGES === "1" ? `/${process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "comb-001"}` : ""}/favicon.svg`,
    shortcut: `${process.env.GITHUB_PAGES === "1" ? `/${process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "comb-001"}` : ""}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
