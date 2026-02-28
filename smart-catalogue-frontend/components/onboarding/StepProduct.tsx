'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Pencil, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

type DraftProduct = {
    id?: string;
    name: string;
    price: string;
    sku: string;
    image?: string;        // original image preview (base64)
    bgRemoved?: boolean;   // after AI
    error?: string;        // AI error
};

export default function StepProduct({ products, setProducts }: any) {
    const [draft, setDraft] = useState<DraftProduct>({
        name: "",
        price: "",
        sku: "",
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    const resetDraft = () => {
        setDraft({ name: "", price: "", sku: "" });
        setEditingId(null);
        setError("");
    };

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setDraft((prev) => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const saveProduct = () => {
        if (!draft.name || !draft.price || !draft.image) {
            setError("Name, price and image are required");
            return;
        }
        setError("");

        if (editingId) {
            setProducts((prev: any[]) =>
                prev.map((p) =>
                    p.id === editingId ? { ...p, ...draft, error: undefined } : p
                )
            );
        } else {
            setProducts((prev: any[]) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    name: draft.name,
                    price: draft.price,
                    sku: draft.sku,
                    image: draft.image,
                    bgRemoved: false,
                },
            ]);
        }

        resetDraft();
    };

    const startEdit = (p: any) => {
        setDraft({
            name: p.name,
            price: p.price,
            sku: p.sku || "",
            image: p.image,
        });
        setEditingId(p.id);
    };

    const removeProduct = (id: string) => {
        setProducts((prev: any[]) => prev.filter((p) => p.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-1">
                <h2 className="text-3xl font-semibold text-center">Add your products</h2>
                <p className="text-sm text-gray-500">Let's showcase what you sell</p>
            </div>

            <div className="flex justify-between items-center">
                <label className="cursor-pointer">
                    <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
                    <Button variant="outline">
                        <FileText className="mr-2" /> Import from Excel
                    </Button>
                </label>

                <p className="text-sm text-gray-500">
                    {products.length} product{products.length !== 1 ? "s" : ""} added
                </p>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-4">
                <Input
                    placeholder="Product Name"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
                <Input
                    type="number"
                    placeholder="Price"
                    value={draft.price}
                    onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                />
                <Input
                    placeholder="SKU (optional)"
                    value={draft.sku}
                    onChange={(e) => setDraft({ ...draft, sku: e.target.value })}
                />

                <label className="border rounded-lg p-3 cursor-pointer flex items-center gap-2 text-sm text-gray-600">
                    <Upload size={16} />
                    {draft.image ? "Change Image" : "Upload Image"}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                        }}
                    />
                </label>
            </div>

            {draft.image && (
                <img
                    src={draft.image}
                    alt="Preview"
                    className="h-40 w-full object-cover rounded-lg border" />
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3">
                <Button
                    onClick={saveProduct}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:text-white"
                >
                    {editingId ? "Update Product" : "Save Product"}
                </Button>

                {editingId && (
                    <Button variant="outline" onClick={resetDraft}>
                        Cancel Edit
                    </Button>
                )}
            </div>

            {/* Added Products */}
            {products.length > 0 && (
                <>
                    <h3 className="font-semibold pt-6">Added Products</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((p: any) => (
                            <div key={p.id} className="border rounded-xl p-3">
                                {p.image ? (
                                    <img
                                        src={p.image}
                                        className="h-32 w-full object-cover rounded-lg"
                                        alt={p.name}
                                    />
                                ) : (
                                    <div className="h-32 w-full flex items-center justify-center rounded-lg border border-dashed text-xs text-gray-400">
                                        No image uploaded
                                    </div>
                                )}
                                <h4 className="mt-2 font-medium">{p.name}</h4>
                                <p className="text-sm text-gray-500">₹{p.price}</p>

                                <div className="flex gap-3 mt-2 text-xs">
                                    <button
                                        onClick={() => startEdit(p)}
                                        className="text-purple-600 hover:underline flex items-center gap-1"
                                    >
                                        <Pencil size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={() => removeProduct(p.id)}
                                        className="text-red-600 hover:underline flex items-center gap-1"
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}