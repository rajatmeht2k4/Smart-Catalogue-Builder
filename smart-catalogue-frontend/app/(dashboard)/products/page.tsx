"use client";

import { useState } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import ProductDialogs from "@/components/products/ProductDialogs";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/lib/hooks";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const { products, isLoading, mutate } = useProducts();
  const { getToken } = useAuth();
  const [dialog, setDialog] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<any | null>(null); // Use any for now since Mongo _id is different from mock id

  const handleAdd = async (productData: any) => {
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      toast.success("Product added perfectly");
      mutate();
    } catch (err) {
      toast.error("Error adding product");
    }
  };

  const handleEdit = async (productData: any) => {
    try {
      const token = await getToken();
      // Notice we use _id for mongo documents
      const id = productData._id || productData.id;
      const res = await fetch(`http://localhost:5000/api/products/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to update product");
      toast.success("Product updated brilliantly");
      mutate();
    } catch (err) {
      toast.error("Error updating product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      toast.success("Product deleted successfully");
      mutate();
    } catch (err) {
      toast.error("Error deleting product");
    }
  };

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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg text-sm font-medium"
          >
            <Plus size={16} className="inline mr-1" /> Add Product
          </Button>

        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        <ProductGrid
          products={products.map((p: any) => ({ ...p, id: p._id || p.id }))} // Map _id to id for the UI components
          onEdit={(p) => {
            setSelected(p);
            setDialog("edit");
          }}
          onDelete={(p) => {
            setSelected(p);
            setDialog("delete");
          }}
        />
      )}

      <ProductDialogs
        mode={dialog}
        product={selected}
        onClose={() => {
          setDialog(null);
          setSelected(null);
        }}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
