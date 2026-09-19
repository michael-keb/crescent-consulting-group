import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import { Header, Footer } from "./site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://crescentconsulting.com.au"),
  title: {
    default: "Crescent Consulting Group | Understanding people. Thriving workplaces.",
    template: "%s | Crescent Consulting Group",
  },
  description:
    "Crescent Consulting Group helps Australian workplaces understand cultural needs and work better with Australian Muslim and diverse Middle Eastern communities. Start with a conversation.",
  applicationName: "Crescent Consulting Group",
  keywords: [
    "Crescent Consulting Group",
    "Crescent Consulting",
    "Australian workplace consulting",
    "cultural understanding at work",
    "Muslim workplace inclusion Australia",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://crescentconsulting.com.au",
    siteName: "Crescent Consulting Group",
    title: "Crescent Consulting Group | Understanding people. Thriving workplaces.",
    description:
      "Crescent Consulting Group helps Australian workplaces understand cultural needs and work better with Australian Muslim and diverse Middle Eastern communities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crescent Consulting Group",
    description:
      "Understanding people. Thriving workplaces. Practical cultural understanding for Australian workplaces.",
  },
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
