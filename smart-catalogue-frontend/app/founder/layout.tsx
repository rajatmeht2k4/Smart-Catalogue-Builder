"use client";

import FounderSidebar from "@/components/founder/FounderSidebar";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function FounderLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-lg leading-none">S</span>
                    </div>
                    <span className="font-semibold text-slate-800">Founder Panel</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </header>

            {/* Sidebar with state passed as props */}
            <FounderSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-8 md:ml-64 w-full max-w-[100vw] overflow-x-hidden">
                <div className="max-w-7xl mx-auto w-full">
                    <SignedIn>
                        {children}
                    </SignedIn>
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                </div>
            </main>
        </div>
    );
}
