"use client";
import Link from "next/link";
import { LayoutDashboard, Package, Layers, Share2, Settings, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useBusiness } from "@/lib/hooks";

export default function Sidebar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { business } = useBusiness();
  const router = useRouter();

  const businessName = business?.name || "My Business";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userImage = user?.imageUrl;
  const initials = businessName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/catalogue-builder", icon: Layers, label: "Catalogue Builder" },
    { href: "/sharing", icon: Share2, label: "Sharing" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col">
      {/* Business profile */}
      <div className="flex items-center gap-3 px-2 mb-8">
        {userImage ? (
          <img src={userImage} alt={businessName} className="h-9 w-9 rounded-lg object-cover" />
        ) : (
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-sm text-slate-800 truncate">{businessName}</p>
          <p className="text-xs text-slate-400 truncate">{userEmail}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mx-2 mb-4" />

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 text-[13px] font-medium flex-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative
                ${active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-amber-400 rounded-r-full" />
              )}
              <item.icon size={18} strokeWidth={active ? 2 : 1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="pt-2 border-t border-gray-100">
        {isSignedIn && (
          <SignOutButton redirectUrl="/">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 text-[13px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={18} strokeWidth={1.5} />
              Logout
            </button>
          </SignOutButton>
        )}
      </div>
    </aside>
  );
}
