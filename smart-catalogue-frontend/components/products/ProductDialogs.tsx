"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@/lib/types";

type Props = {
  mode: "add" | "edit" | "delete" | null;
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product) => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductDialogs({
  mode,
  product,
  onClose,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const isOpen = mode !== null;
  const isEdit = mode === "edit";

  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    price: "",
    sku: "",
    image: "",
  });

  useEffect(() => {
    if (product) setForm(product);
    else setForm({ id: crypto.randomUUID(), name: "", price: "", sku: "", image: "" });
  }, [product, mode]);

  if (!mode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" && "Add Product"}
            {mode === "edit" && "Edit Product"}
            {mode === "delete" && "Delete Product"}
          </DialogTitle>
        </DialogHeader>

        {mode === "delete" ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <b>{product?.name}</b>? This action cannot be undone.
            </p>

            <DialogFooter>
              <Button variant="outline" className="hover:shadow-md" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="text-white bg-red-700 hover:shadow-md"
                onClick={() => {
                  if (product && (product.id || product._id)) {
                    onDelete((product.id || product._id) as string);
                  }
                  onClose();
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <div className="space-y-4 mt-2">
              <div>
                <Label>Product Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              <div>
                <Label>Price</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>

              <div>
                <Label>SKU</Label>
                <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </div>

              <div>
                <Label>Image URL</Label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>

              <div>
                <Label>Upload Image</Label>
                <Input type="file" />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  mode === "add" ? onAdd(form) : onEdit(form);
                  onClose();
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
