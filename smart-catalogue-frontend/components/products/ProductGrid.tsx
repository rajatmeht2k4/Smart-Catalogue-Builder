"use client";

import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onEdit={() => onEdit(p)}
          onDelete={() => onDelete(p)}
        />
      ))}
    </div>
  );
}
