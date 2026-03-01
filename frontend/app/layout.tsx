import type { Metadata } from "next";
import { Inter, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Osmose",
  description: "Messagerie en ligne Osmose. Connectez vous, discutez, vibez.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="dracula">
      <body
        className={`${roboto.variable} ${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Providers>
         {children} 
        </Providers>
      </body>
    </html>
  );
}
