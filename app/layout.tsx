import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import { Header, Footer } from "./site-shell";

export const metadata: Metadata = {
  title: "Crescent Consulting Group | Understanding people. Thriving workplaces.",
  description: "A practical bridge between Australian workplaces and Australian Muslim and diverse Middle Eastern communities. Start with a conversation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className="antialiased"><Header/>{children}<Footer/></body>
    </html>
  );
}
