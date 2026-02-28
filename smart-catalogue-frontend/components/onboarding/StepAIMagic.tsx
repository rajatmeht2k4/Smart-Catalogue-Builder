'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

export default function StepAIMagic({ products, setProducts }: any) {
  const [processing, setProcessing] = useState(false);
  const [hasRunAI, setHasRunAI] = useState(false);

  const bulkRemoveBg = async () => {
    setProcessing(true);

    // MOCK AI PROCESS
    await new Promise((res) => setTimeout(res, 2000));

    setProducts((prev: any[]) =>
      prev.map((p) => {
        const failed = Math.random() < 0.2;
        return failed
          ? { ...p, bgRemoved: false, error: "AI failed. Try a different image." }
          : { ...p, bgRemoved: true, error: undefined };
      })
    );

    setHasRunAI(true);
    setProcessing(false);
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-semibold text-center">AI Magic ✨</h2>

      <Button
        disabled={processing}
        onClick={bulkRemoveBg}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:text-white"
      >
        <Wand2 className="mr-2" />
        {processing ? "Processing images..." : "Remove background for all products"}
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {products.map((p: any) => (
          <div
          key={p.id}
          className="border rounded-xl p-3 max-w-full overflow-hidden bg-white"
        >
            <img
              src={p.image}
              alt={p.name}
              className="h-32 w-full object-cover rounded-lg"
            />

            <h4 className="mt-2 font-medium truncate">{p.name}</h4>

            {hasRunAI && p.bgRemoved && (
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <CheckCircle2 size={14} /> Background removed
              </p>
            )}

            {hasRunAI && p.error && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertTriangle size={14} /> {p.error}
              </p>
            )}

            {hasRunAI && !p.bgRemoved && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
              >
                <RefreshCw size={14} className="mr-1" />
                Retry after re-upload
              </Button>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center">
        If background removal fails or doesn’t look good, go back and re-upload a better image.
      </p>
    </div>
  );
}