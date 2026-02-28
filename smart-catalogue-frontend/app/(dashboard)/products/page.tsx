"use client";

import { useState } from "react";
import { mockProducts, Product } from "@/lib/mockProducts";
import ProductGrid from "@/components/products/ProductGrid";
import ProductDialogs from "@/components/products/ProductDialogs";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [dialog, setDialog] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalogue</p>
        </div>


        <div className="space-x-3">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => {
                alert("Excel import coming soon 🚧");
              }}
            />
            <Button
              variant="outline"
              className="border-2 bg-white text-gray-900 hover:shadow-lg hover:bg-gray-50"
            >
              <FileText className="mr-2" />
              Bulk Import (Excel)
            </Button>
          </label>

          <Button
            onClick={() => setDialog("add")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 rounded-lg text-md  hover:shadow-lg"
          >
            <Plus size={16} className="inline mr-1" /> Add Product
          </Button>

        </div>
      </div>

      <ProductGrid
        products={products}
        onEdit={(p) => {
          setSelected(p);
          setDialog("edit");
        }}
        onDelete={(p) => {
          setSelected(p);
          setDialog("delete");
        }}
      />

      <ProductDialogs
        mode={dialog}
        product={selected}
        onClose={() => {
          setDialog(null);
          setSelected(null);
        }}
        onAdd={(p) => setProducts((prev) => [...prev, p])}
        onEdit={(p) =>
          setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)))
        }
        onDelete={(id) =>
          setProducts((prev) => prev.filter((x) => x.id !== id))
        }
      />
    </div>
  );
}
