"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CatalogueProduct } from "@/lib/mockCatalogueProducts";

export default function SortableProduct({
  product,
  onToggle,
}: {
  product: CatalogueProduct;
  onToggle: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white border rounded-xl hover:shadow-sm"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <Checkbox checked={product.included} onCheckedChange={() => onToggle(product.id)} />

      <img src={product.image} className="w-12 h-12 object-cover rounded-md" />

      <div className="flex-1">
        <div className="text-sm font-medium">{product.name}</div>
        <div className="text-xs text-gray-500">{product.price}</div>
      </div>
    </div>
  );
}
