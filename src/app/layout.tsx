import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krishiv-arora-portfolio.vercel.app"),
  title: "Krishiv Arora — Aspiring Software Engineer",
  description:
    "Portfolio of Krishiv Arora: Computer Science undergraduate at JIIT and software engineering trainee at GlobalLogic, building AI systems and dependable web applications under real systems constraints.",
  keywords: [
    "Krishiv Arora",
    "Aspiring Software Engineer",
    "AI Systems Engineer",
    "LangGraph",
    "pgvector",
    "Hybrid RAG",
    "FastAPI",
    "Next.js",
    "ReportLab",
  ],
  authors: [{ name: "Krishiv Arora", url: "https://github.com/Krishiv1611" }],
  creator: "Krishiv Arora",
  openGraph: {
    title: "Krishiv Arora — Aspiring Software Engineer",
    description:
      "Computer Science undergraduate and software engineering trainee building AI systems and dependable web applications under real systems constraints.",
    url: "https://krishiv-arora-portfolio.vercel.app",
    siteName: "Krishiv Arora — Engineering Portfolio",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090A0C" },
    { media: "(prefers-color-scheme: light)", color: "#F7F6F2" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-canvas text-ink-primary selection:bg-signal selection:text-black">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
