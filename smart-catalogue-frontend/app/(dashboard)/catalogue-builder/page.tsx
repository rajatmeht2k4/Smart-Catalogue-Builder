"use client";

import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Eye, Share2, Check, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import SortableProduct from "@/components/catalogue/SortableProduct";
import CataloguePreview from "@/components/catalogue/CataloguePreview";
import { mockCatalogueProducts, CatalogueProduct } from "@/lib/mockCatalogueProducts";

export default function CatalogueBuilderPage() {
    const [title, setTitle] = useState("Love Mithaas Menu");
    const [description, setDescription] = useState("Refreshing flavored drinks for everyone");
    const [products, setProducts] = useState<CatalogueProduct[]>(mockCatalogueProducts);
    const [saving, setSaving] = useState(false);
    const [copied,setCopied] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleDragEnd = (e: any) => {
        const { active, over } = e;
        if (active.id !== over.id) {
            setProducts((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const toggleProduct = (id: string) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, included: !p.included } : p))
        );
    };

    const included = products.filter((p) => p.included);

    return (
        <>
            {/* Top */}
            <div className="mb-6 ">
                <h1 className="text-2xl font-semibold">Products</h1>
                <p className="text-sm text-gray-500">Customize and arrange your products</p>
            </div>

            {/* Left */}
            {/* Two Panel Layout */}
            <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                {/* Left Panel */}
                <div className="h-full overflow-y-auto pr-2 space-y-4">
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

                    <Card className="p-4">
                        <p className="text-sm mb-2">Products</p>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={products.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-2">
                                    {products.map((p) => (
                                        <SortableProduct key={p.id} product={p} onToggle={toggleProduct} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </Card>

                    <div className="space-y-2 sticky bottom-0 bg-white/70 backdrop-blur p-2 rounded-xl">
                        <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                            onClick={() => {
                                setSaving(true);
                                setTimeout(() => {
                                    setSaving(false);
                                    toast.success("Catalogue published");
                                }, 1000);
                            }}
                        >
                            {saving ? <Save className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                            Publish
                        </Button>

                        <Button variant="outline" className="w-full hover:bg-gray-100 ">
                            <Eye className="mr-2 h-4 w-4" /> Preview
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full hover:bg-gray-100"
                            onClick={() => {
                                setCopied(true);
                                setTimeout(() =>{
                                    setCopied(false);
                                    navigator.clipboard.writeText("smartcatalogue.app/catalogue/npmartindia");
                                    toast.success("Link copied");
                                },1000)
                            }}
                        >
                            {copied ?  <ClipboardCheck className="mr-2 h-4 w-4" /> :<Share2 className="mr-2 h-4 w-4" />}
                            Shark Link
                        </Button>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-50 to-pink-50 p-4 rounded-xl">
                    <CataloguePreview title={title} description={description} products={included} />
                </div>
            </div>


        </>
    );
}
