import type { Metadata } from "next";
import "./globals.css";
import ThreeBackground from "@/components/three/ThreeBackground";
import Footer from "@/components/layouts/Footer";
import Loading from "@/components/layouts/Loading";
import PageTransition from "@/components/layouts/PageTransition";
import TypekitLoader from "@/components/layouts/TypekitLoader";

export const metadata: Metadata = {
  title: "Kz Creation",
  description: "Portfolio & Blog by Kizuki Aiki",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <TypekitLoader />
        <Loading />
        <ThreeBackground />

        <div className="grid-bg fixed inset-0 w-full h-screen bg-[#131313] pointer-events-none -z-20" />

        <div id="smooth-wrapper" className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </div>

        <div className="fixed left-0 bottom-0 w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
