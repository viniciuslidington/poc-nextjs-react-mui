import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from "./components/layout/NavBar";
import Container from "@mui/material/Container";
import ThemeRegistry from "./components/layout/ThemeRegistry";
import RecoilProvider from "./components/providers/recoilProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty Characterverse",
  description: "A Next.js application showcasing characters, episodes, and locations from the Rick and Morty universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RecoilProvider>
          <ThemeRegistry>
            <NavBar/>
            <Container component="main" sx={{ mt: 5 , mb: 4 }}>
              {children}
            </Container>
          </ThemeRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}

