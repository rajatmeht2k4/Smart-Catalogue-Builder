'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, RefreshCw, CheckCircle2, AlertTriangle, Upload, ThumbsUp, ThumbsDown, Eye, X } from "lucide-react";

export default function StepAIMagic({ products, setProducts }: any) {
  const [globalProcessing, setGlobalProcessing] = useState(false);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [previewImage, setPreviewImage] = useState<{ id: string, original: string, processed: string } | null>(null);

  const processImage = async (productId: string, imageBase64: string) => {
    setProcessingIds(prev => new Set(prev).add(productId));

    try {
      const res = await fetch("http://localhost:5000/api/products/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setProducts((prev: any[]) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, processedImage: data.image, bgStatus: "awaiting_approval", error: undefined }
            : p
        )
      );
    } catch (err: any) {
      setProducts((prev: any[]) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, bgStatus: "failed", error: err.message || "AI failed" }
            : p
        )
      );
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const bulkRemoveBg = async () => {
    setGlobalProcessing(true);
    const toProcess = products.filter((p: any) => !p.bgRemoved && p.bgStatus !== "awaiting_approval");

    // Process sequentially or in parallel depending on API limits. We'll do parallel for now.
    await Promise.all(
      toProcess.map((p: any) => processImage(p.id, p.image))
    );

    setGlobalProcessing(false);
  };

  const handleApprove = (productId: string) => {
    setProducts((prev: any[]) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, image: p.processedImage, bgRemoved: true, bgStatus: "approved", processedImage: undefined }
          : p
      )
    );
    if (previewImage?.id === productId) setPreviewImage(null);
  };

  const handleReject = (productId: string) => {
    setProducts((prev: any[]) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, bgRemoved: false, bgStatus: "rejected", processedImage: undefined }
          : p
      )
    );
    if (previewImage?.id === productId) setPreviewImage(null);
  };

  const handleReupload = (productId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProducts((prev: any[]) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, image: reader.result as string, bgRemoved: false, bgStatus: "pending", error: undefined, processedImage: undefined }
            : p
        )
      );
    };
    reader.readAsDataURL(file);
  };

  // Check if ALL products are approved
  const allApproved = products.every((p: any) => p.bgRemoved || p.bgStatus === "approved");

  return (
    <div className="space-y-6 w-full relative">
      <h2 className="text-2xl font-semibold text-center">AI Magic ✨</h2>

      <Button
        disabled={globalProcessing || allApproved}
        onClick={bulkRemoveBg}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:text-white"
      >
        <Wand2 className="mr-2" />
        {globalProcessing ? "Processing images..." : allApproved ? "All Images Approved" : "Remove background for pending products"}
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {products.map((p: any) => {
          const isProcessing = processingIds.has(p.id);
          const showProcessed = p.bgStatus === "awaiting_approval" && p.processedImage;
          const displayImage = showProcessed ? p.processedImage : p.image;

          return (
            <div
              key={p.id}
              className={`border rounded-xl p-3 max-w-full overflow-hidden bg-white ${isProcessing ? "opacity-50" : ""}`}
            >
              <div className="relative group">
                <img
                  src={displayImage}
                  alt={p.name}
                  className="h-32 w-full object-cover rounded-lg bg-gray-100" // Added light bg to see transparency
                />
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                    <RefreshCw className="animate-spin text-indigo-600" size={24} />
                  </div>
                )}

                {/* Preview Overlay Button */}
                {showProcessed && !isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="gap-2"
                      onClick={() => setPreviewImage({ id: p.id, original: p.image, processed: p.processedImage })}
                    >
                      <Eye size={16} /> Preview
                    </Button>
                  </div>
                )}
              </div>

              <h4 className="mt-2 font-medium truncate">{p.name}</h4>

              {p.bgRemoved && (
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <CheckCircle2 size={14} /> Approved & Ready
                </p>
              )}

              {p.bgStatus === "awaiting_approval" && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-indigo-600 font-medium">Verify cut-out</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleApprove(p.id)} className="flex-1 bg-green-600 hover:bg-green-700 h-8">
                      <ThumbsUp size={14} className="mr-1" /> Looks Good
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(p.id)} className="flex-1 text-red-600 border-red-200 hover:bg-red-50 h-8">
                      <ThumbsDown size={14} className="mr-1" /> Reject
                    </Button>
                  </div>
                </div>
              )}

              {p.error && p.bgStatus === "failed" && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertTriangle size={14} /> {p.error}
                </p>
              )}

              {(p.bgStatus === "rejected" || p.bgStatus === "failed") && (
                <div className="mt-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleReupload(p.id, e.target.files[0]);
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center pointer-events-none"
                    // Button is pointer-events-none so click passes to the label/input wrapper
                    >
                      <Upload size={14} className="mr-1" />
                      Upload Better Image
                    </Button>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 text-center">
        Ensure all products have great backgrounds. You must approve them to continue.
      </p>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold pr-8">Preview Cut-out</h3>
            <p className="text-sm text-gray-500">Compare the original image with the AI-removed background.</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600">Original Image</span>
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square flex items-center justify-center">
                  <img src={previewImage.original} className="max-w-full max-h-full object-contain" alt="Original" />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-indigo-600">AI Cut-out</span>
                {/* Using a checkerboard background pattern to clearly show transparency */}
                <div
                  className="rounded-xl overflow-hidden border border-indigo-200 aspect-square flex items-center justify-center"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                    backgroundColor: '#fff'
                  }}
                >
                  <img src={previewImage.processed} className="max-w-full max-h-full object-contain" alt="Processed" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={() => handleApprove(previewImage.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <ThumbsUp size={16} className="mr-2" /> Looks Great, Approve
              </Button>
              <Button
                variant="outline"
                onClick={() => handleReject(previewImage.id)}
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <ThumbsDown size={16} className="mr-2" /> Reject & Re-upload
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}