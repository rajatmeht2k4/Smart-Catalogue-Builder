"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-lg">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white grid place-items-center">
                        ✨
                    </div>
                    Smart Catalogue Builder
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
                    <a href="#features" className="hover:text-black">Features</a>
                    <a href="#pricing" className="hover:text-black">Pricing</a>
                    <a href="#testimonials" className="hover:text-black">Testimonials</a>
                    <Link href="/login" className="hover:text-black">Log In</Link>
                </nav>

                <Link
                    href="/signup"
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    Get Started Free
                </Link>
            </div>
        </nav>
    );
}
