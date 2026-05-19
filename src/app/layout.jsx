import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Nithopie Note - Secure & Premium Notebook",
    template: "%s | Nithopie Note",
  },
  description: "A highly secure, premium workspace for personal notes, code snippets, and seamless collaboration.",
  keywords: ["Nithopie Note", "secure notebook", "developer notes", "private notes", "markdown editor"],
  authors: [{ name: "Nithopie" }],
  creator: "Nithopie",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Nithopie Note - Secure & Premium Notebook",
    description: "A highly secure, premium workspace for personal notes, code snippets, and seamless collaboration.",
    siteName: "Nithopie Note",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nithopie Note - Secure & Premium Notebook",
    description: "A highly secure, premium workspace for personal notes, code snippets, and seamless collaboration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning  className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}