import type { Metadata } from "next";
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Overlays } from "@/components/Overlays";
import { StoreProvider } from "@/lib/cart";
import "./globals.css";

const sans = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto",
});

const serif = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Deshojo Bazar — দেশজ খাবারের বিশ্বস্ত বাজার",
    template: "%s | Deshojo Bazar",
  },
  description: "Deshojo Bazar premium e-commerce storefront",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${sans.variable} ${serif.variable}`}>
      <body className="m-0 overflow-x-clip bg-paper font-sans text-ink antialiased">
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Overlays />
        </StoreProvider>
      </body>
    </html>
  );
}
