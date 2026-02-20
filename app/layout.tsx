import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/layout/NavBar";
import ThemeRegistry from "./components/layout/ThemeRegistry";
import { Container } from '@mui/material';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty App",
  description: "POC Next.js + React + MUI",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
          <ThemeRegistry>
            <NavBar/>
            <Container component="main" sx={{ mt: 5, mb: 4 }}>
              {children}
            </Container>
          </ThemeRegistry>
      </body>
    </html>
  );
}

