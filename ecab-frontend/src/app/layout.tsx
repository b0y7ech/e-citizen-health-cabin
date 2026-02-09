import type { Metadata } from "next";
import { Lexend, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "E-Citizen Health Cabin",
  description: "Trạm y tế thông minh - Smart Health Kiosk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${lexend.variable} ${beVietnamPro.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
