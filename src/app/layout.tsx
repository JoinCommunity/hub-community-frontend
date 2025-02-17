// app/layout.tsx
import { metadata } from "./lib/metadata";
import { viewport } from "./lib/viewport";
import "./globals.css";
import { AuthProvider } from "./context/auth-context"; // Importe o AuthProvider

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {/* Envolve todo o conteúdo com o AuthProvider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
