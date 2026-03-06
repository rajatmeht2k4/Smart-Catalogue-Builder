"use client";

import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Eye, Share2, Check, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import SortableProduct from "@/components/catalogue/SortableProduct";
import { useBusiness, useProducts } from "@/lib/hooks";
import { useAuth } from "@clerk/nextjs";
import { Product } from "@/lib/types";
import { catalogueTemplates } from "@/lib/catalogueTemplates";

export default function CatalogueBuilderPage() {
    const { business, mutate: mutateBusiness } = useBusiness();
    const { products: dbProducts, mutate: mutateProducts } = useProducts();
    const { getToken } = useAuth();

    // Local State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState("");

    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor));
    const [mounted, setMounted] = useState(false);

    // Initialize local state when data loads
    useEffect(() => {
        if (business && title === "") {
            setTitle(business.name || "");
            setDescription(business.tagline || "");
            setSelectedTemplateId(business.templateId || catalogueTemplates[0]?.id || "");
        }
    }, [business]);

    useEffect(() => {
        if (dbProducts && dbProducts.length > 0 && products.length === 0) {
            setProducts([...dbProducts].sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
    }, [dbProducts]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (over && active.id !== over.id) {
            setProducts((items) => {
                const oldIndex = items.findIndex((i) => (i._id || i.id) === active.id);
                const newIndex = items.findIndex((i) => (i._id || i.id) === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                return newItems.map((item, index) => ({ ...item, order: index }));
            });
        }
    };

    const toggleProduct = (id: string) => {
        setProducts((prev) =>
            prev.map((p) => ((p._id || p.id) === id ? { ...p, isActive: p.isActive === false ? true : false } : p))
        );
    };

    const handlePublish = async () => {
        setSaving(true);
        try {
            const token = await getToken();

            // 1. Update Business Details
            await fetch("http://localhost:5000/api/business/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name: title, tagline: description })
            });

            // 2. Update Template Selection
            await fetch("http://localhost:5000/api/business/update-template", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ templateId: selectedTemplateId })
            });

            // 3. Update Product Order & Visibility
            const updates = products.map((p, index) => ({
                id: p._id || p.id,
                order: index,
                isActive: p.isActive !== false
            }));

            await fetch("http://localhost:5000/api/products/bulk-update", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ products: updates })
            });

            toast.success("Catalogue published successfully!");
            mutateBusiness();
            mutateProducts();
        } catch (error) {
            toast.error("Failed to publish catalogue");
            console.error(error);
        } finally {
            setSaving(false);
        }
    }

    const included = products.filter((p) => p.isActive !== false);
    const catalogueUrl = `http://localhost:3000/catalogue/${business?.slug || ""}`;

    // Find selected template
    const selectedTemplate = catalogueTemplates.find(t => t.id === selectedTemplateId);
    const TemplateComponent = selectedTemplate?.Full;

    // Build a fake business object for the preview
    const previewBusiness = {
        ...(business || {}),
        name: title,
        businessName: title,
        tagline: description,
    };

    return (
        <>
            {/* Top */}
            <div className="mb-6 ">
                <h1 className="text-2xl font-semibold">Catalogue Builder</h1>
                <p className="text-sm text-gray-500">Customize template, arrange products, and publish</p>
            </div>

            {/* Two Panel Layout */}
            <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                {/* Left Panel */}
                <div className="h-full overflow-y-auto pr-2 space-y-4">
                    {/* Title & Description */}
                    <Card className="p-4 space-y-3">
                        <div>
                            <Label className="mb-1">Title</Label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <Label className="mb-1">Description</Label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </Card>

                    {/* Product List */}
                    <Card className="p-4">
                        <p className="text-sm mb-2">Products</p>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={products.map((p) => (p._id || p.id) as string)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-2">
                                    {products.map((p) => (
                                        <SortableProduct key={p._id || p.id} product={p} onToggle={toggleProduct} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-2 sticky bottom-0 bg-white/70 backdrop-blur p-2 rounded-xl">
                        <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                            onClick={handlePublish}
                            disabled={saving}
                        >
                            {saving ? <Save className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                            Publish
                        </Button>

                        <a href={catalogueUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="w-full hover:bg-gray-100 mt-2">
                                <Eye className="mr-2 h-4 w-4" /> Preview View
                            </Button>
                        </a>

                        <Button
                            variant="outline"
                            className="w-full hover:bg-gray-100"
                            onClick={() => {
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                    navigator.clipboard.writeText(catalogueUrl);
                                    toast.success("Link copied");
                                }, 1000)
                            }}
                        >
                            {copied ? <ClipboardCheck className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                            Share Link
                        </Button>
                    </div>
                </div>

                {/* Right Panel — Live Template Preview (view-only, CTAs hidden) */}
                <div className="h-full overflow-y-auto rounded-xl border catalogue-preview-panel">
                    {TemplateComponent ? (
                        <TemplateComponent business={previewBusiness} products={included as any[]} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                            No template selected
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
