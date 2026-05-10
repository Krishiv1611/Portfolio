import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://krishiv-portfolio.vercel.app"),
  title: {
    default: "Krishiv Arora | AI Engineer & Full Stack Developer",
    template: "%s | Krishiv Arora"
  },
  description:
    "Premium portfolio of Krishiv Arora, an AI engineer and full-stack developer building GenAI, RAG, backend systems, and modern web products.",
  keywords: [
    "Krishiv Arora",
    "AI Engineer",
    "Full Stack Developer",
    "GenAI",
    "RAG",
    "Next.js",
    "LangChain",
    "FastAPI"
  ],
  authors: [{ name: "Krishiv Arora", url: "https://github.com/Krishiv1611" }],
  creator: "Krishiv Arora",
  openGraph: {
    title: "Krishiv Arora | AI Engineer & Full Stack Developer",
    description:
      "AI/full-stack portfolio featuring GenAI systems, public GitHub projects, LeetCode progress, and production-ready engineering work.",
    url: "https://krishiv-portfolio.vercel.app",
    siteName: "Krishiv Arora Portfolio",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-ink font-sans antialiased">{children}</body>
    </html>
  );
}
