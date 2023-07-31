import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Footer from "./components/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CooperPriceHealth",
    description: "Find a therapist near you",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <nav>
                        <Link className="link-nav-header" href="/">
                            Home
                        </Link>
                        <Link className="link-nav-header" href="/booking">
                            Schedule
                        </Link>
                        <Link className="link-nav-header" href="/secret">
                            Secret
                        </Link>
                    </nav>
                </header>
                {children}
                <Footer />
            </body>
        </html>
    );
}
