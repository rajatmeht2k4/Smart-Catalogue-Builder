"use client";

import { ShoppingBag, Zap } from "lucide-react";

export default function FreshmartPreview() {
  return (
    <div className="w-full max-w-[320px] mx-auto bg-white rounded-xl overflow-hidden border">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#E53935] flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold leading-none text-[#E53935]">
              FreshMart
            </p>
            <p className="text-[9px] text-gray-500 leading-none">
              Quality. Always.
            </p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#E53935] text-white px-3 py-4 text-center">
        {/* <div className="inline-flex items-center gap-1 bg-yellow-400 text-[#E53935] text-[9px] font-bold px-2 py-1 rounded-full mb-2">
          <Zap className="w-3 h-3" />
          FLASH DEALS
        </div> */}

        <p className="text-sm font-black leading-tight">
          Premium Quality,<br />
          <span className="text-yellow-300">Unbeatable Prices</span>
        </p>

        <p className="text-[10px] mt-1 opacity-90">
          Discover handpicked products and great deals
        </p>
      </div>

      {/* Products Preview */}
      <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50">
        <div className="bg-white rounded-md h-16 shadow-sm" />
        <div className="bg-white rounded-md h-16 shadow-sm" />
      </div>
    </div>
  );
}