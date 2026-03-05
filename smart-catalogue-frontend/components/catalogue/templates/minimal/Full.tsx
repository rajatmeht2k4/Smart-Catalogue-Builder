"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, ShoppingBag, Zap, Check, MessageSquare, MessageCircleCheck } from "lucide-react";
import { Business, Product } from "@/lib/catalogueSchema";

export default function FreshmartFull({
  business,
  products,
}: {
  business: Business;
  products: Product[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedNames = Array.from(selected)
    .map((id) => products.find((p) => p._id === id)?.name)
    .filter(Boolean) as string[];

  const waOrderText =
    selectedNames.length > 0
      ? `Hi ${business.name}, I'd like to place an order for:\n${selectedNames
        .map((n, i) => `${i + 1}. ${n}`)
        .join("\n")}`
      : `Hi ${business.name}, I'd like to place an order.`;

  const waQueryText =
    selectedNames.length > 0
      ? `Hi ${business.name}, I have a question about:\n${selectedNames
        .map((n, i) => `${i + 1}. ${n}`)
        .join("\n")}`
      : `Hi ${business.name}, I have a question about your products.`;

  const waOrderUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    waOrderText
  )}`;
  const waQueryUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    waQueryText
  )}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg bg-gradient-to-r from-purple-600 to-pink-500"
            // style={{ background: business.brandColor || "#E53935" }}
            >
              <ShoppingBag className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
            <div className="text-center">
              <h1
                className="font-black text-purple-700 text-xl sm:text-2xl tracking-tight "
              // style={{ color: business.brandColor || "#E53935" }}
              >
                {business.name}
              </h1>
              <p className="text-xs text-gray-600 font-semibold hidden sm:block">
                {business.tagline || "Quality. Always."}
              </p>
            </div>

          <button
            onClick={() =>
              navigator.share?.({
                title: business.name,
                text: business.tagline,
                url: window.location.href,
              })
            }
            className="p-2.5 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Share catalogue"
          >
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-white bg-gradient-to-r from-purple-600 to-pink-500"

      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            {/* <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center gap-2 bg-[#FFEB3B] text-[#E53935] px-4 py-2 rounded-full mb-6 font-black text-sm shadow-lg"
                        >
                            <Zap className="w-4 h-4 fill-current" />
                            FLASH DEALS
                        </motion.div> */}

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight text-left">
              Premium Quality,
              <br />
              <span className="text-[#FFEB3B]">Unbeatable Prices</span>
            </h2>

            <p className="text-lg sm:text-xl font-semibold text-white/90 max-w-2xl text-left">
              Discover handpicked products and great deals from local businesses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              Featured Products
            </h3>
            <div
              className="w-24 h-1.5 mx-auto rounded-full bg-purple-700"
            // style={{ background: business.brandColor || "#E53935" }}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((p, index) => {
              const active = selected.has(p._id);
              return (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => toggle(p._id)}
                >
                  <div
                    className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full relative ${active ? "ring-2 ring-offset-2" : ""
                      }`}
                    style={{ '--tw-ring-color': "#7e22ce" } as React.CSSProperties}
                  >
                    {/* Checkbox */}
                    <div className="absolute top-3 right-3 z-10">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: active ? 1 : 0.9,
                          backgroundColor: active
                            ? "#7e22ce"
                            : "#FFFFFF",
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 ${active
                          ? "border-transparent"
                          : "border-gray-300"
                          }`}
                      >
                        {active && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <motion.img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="text-gray-900 font-bold text-base sm:text-lg mb-2 line-clamp-2">
                        {p.name}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="font-black text-xl sm:text-2xl"
                          style={{ color: "#7e22ce" }}
                        >
                          ₹{p.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating CTAs */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp Order */}
        <motion.a
          href={waOrderUrl}
          target="_blank"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-[#25D366] text-white px-4 py-4 sm:px-6 rounded-2xl font-bold text-base shadow-2xl transition-all flex items-center gap-3 sm:min-w-[200px] "
        >
          <MessageCircleCheck className="w-6 h-6" />
          <span className="hidden sm:inline">WhatsApp Order</span>
          <AnimatePresence>
            {selected.size > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="absolute -top-2 -right-2 bg-purple-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black shadow-lg"
              >
                {selected.size}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>

        {/* Ask Query */}
        <motion.a
          href={waQueryUrl}
          target="_blank"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-white text-purple-700 px-4 py-4 sm:px-6 rounded-2xl font-bold text-base shadow-2xl transition-all flex items-center gap-3 border-2 border-gray-200 hover:border-purple-700 sm:min-w-[200px] "
        >
          <MessageSquare className="w-6 h-6 text-purple-700" 
          // style={{ color: business.brandColor || "#E53935" }} 
          />
          <span className="hidden sm:inline">Ask Query</span>
          <AnimatePresence>
            {selected.size > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="absolute -top-2 -right-2 bg-purple-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black shadow-lg"
              >
                {selected.size}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>

      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Powered by <span className="font-bold text-gray-900">Smart Catalogue Builder</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}