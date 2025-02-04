import "src/shared/styles/global.css";

import type { Metadata } from "next";
import AppProvider from "src/shared/providers/AppProvider";
import { baseMetadata } from "src/shared/utils/metadata";
import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  display: "block",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = baseMetadata;
