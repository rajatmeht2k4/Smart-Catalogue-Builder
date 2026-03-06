"use client";
import Link from "next/link";
import { LayoutDashboard, Package, Boxes, Share2, Bot, Settings, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";


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

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${pathname === path
      ? "bg-purple-50 text-purple-600"
      : "hover:bg-gray-100 text-gray-700"
    }`;


  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md px-5 py-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        {userImage ? (
          <img src={userImage} alt={businessName} className="h-10 w-10 rounded-xl object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">{businessName}</p>
          <p className="text-xs text-gray-400">{userEmail}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 text-sm">
        <Link href="/admin" className={linkClass('/admin')}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link href="/products" className={linkClass('/products')}>
          <Package size={18} /> Products
        </Link>

        {/* <Link href="#" className={linkClass('/inventory')}>
          <Boxes size={18} /> Inventory
        </Link> */}

        <Link href="/catalogue-builder" className={linkClass('/catalogue-builder')}>
          <Boxes size={18} /> Catalogue Builder
        </Link>

        <Link href="/sharing" className={linkClass('/sharing')}>
          <Share2 size={18} /> Sharing
        </Link>

        <Link href="/settings" className={linkClass('/settings')}>
          <Settings size={18} /> Settings
        </Link>
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        {isSignedIn && (
          <SignOutButton redirectUrl="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SignOutButton>
        )}

      </div>
    </aside>
  );
}
