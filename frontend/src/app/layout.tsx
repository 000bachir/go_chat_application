import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthContextProvider from "@/middleware/modules/Auth_provider";
import WebSocketProvider from "@/middleware/modules/Websocket_provider";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat application",
  description: "chat application using go lang and next js ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <AuthContextProvider></AuthContextProvider> */}

        <WebSocketProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
              {children}
            </ThemeProvider>

          </body>
        </WebSocketProvider>
          
    </html>
  );
}
