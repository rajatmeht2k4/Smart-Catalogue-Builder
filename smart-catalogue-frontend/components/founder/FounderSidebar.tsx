"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
    BarChart3,
    Building2,
    ShieldAlert,
    Activity,
    Settings,
    Sparkles,
    Search,
    Zap,
    Users,
    Layers,
    CreditCard,
    ShieldCheck,
    FileText,
    Bell,
    LifeBuoy,
    Flag
} from "lucide-react";

const navigationGroups = [
    {
        label: "General",
        items: [
            { name: "Overview", href: "/founder", icon: BarChart3 },
            { name: "Analytics", href: "/founder/analytics", icon: Activity },
            { name: "Notifications", href: "/founder/notifications", icon: Bell },
        ]
    },
    {
        label: "Management",
        items: [
            { name: "User Management", href: "/founder/users", icon: Users },
            { name: "Business Registry", href: "/founder/businesses", icon: Building2 },
            { name: "Catalogues", href: "/founder/catalogues", icon: Layers },
            { name: "Subscriptions", href: "/founder/subscriptions", icon: CreditCard },
        ]
    },
    {
        label: "System & Security",
        items: [
            { name: "System Settings", href: "/founder/settings", icon: Settings },
            { name: "Roles & Permissions", href: "/founder/roles", icon: ShieldCheck },
            { name: "Audit Logs", href: "/founder/audit", icon: FileText },
        ]
    },
    {
        label: "Support & Compliance",
        items: [
            { name: "Support", href: "/founder/support", icon: LifeBuoy },
            { name: "Reports & Abuse", href: "/founder/reports", icon: Flag },
        ]
    }
];

interface FounderSidebarProps {
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
}

export default function FounderSidebar({ isOpen = false, setIsOpen }: FounderSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <div className="flex items-center gap-2 px-6 py-6 h-[88px]">
                <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-slate-800 truncate">SCB Founder</p>
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Super Admin</p>
                </div>
            </div>

            <div className="h-px bg-gray-100 mx-4 mb-4" />

            <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search platform..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:bg-white transition-colors"
                    />
                </div>

                <nav className="flex flex-col gap-6 text-[13px] font-medium">
                    {navigationGroups.map((group) => (
                        <div key={group.label} className="flex flex-col gap-0.5">
                            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                {group.label}
                            </span>
                            {group.items.map((item) => {
                                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/founder");

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen && setIsOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative
                                            ${isActive
                                                ? "bg-violet-50 text-violet-700"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        {isActive && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-violet-600 rounded-r-full" />
                                        )}
                                        <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </div>

            <div className="mt-auto px-4 pb-4">
                <div className="rounded-xl bg-violet-50 p-4 border border-violet-100/50 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-violet-100 rounded-full blur-2xl group-hover:bg-violet-200 transition-colors" />
                    <div className="flex items-center gap-2 mb-1.5 relative z-10">
                        <Zap className="h-4 w-4 text-violet-600" />
                        <span className="text-xs font-semibold text-violet-900">Ring-0 Access</span>
                    </div>
                    <p className="text-[11px] text-violet-700/80 leading-tight relative z-10">
                        You are operating with global privileges. Actions affect the entire platform.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <UserButton
                        afterSignOutUrl="/sign-in"
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8 rounded-lg"
                            }
                        }}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800">Founder</span>
                        <span className="text-xs text-slate-500">Global Admin</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
