import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "../ui/button";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-purple-600">{product.price}</p>
        {product.sku && <p className="text-xs text-gray-500">SKU: {product.sku}</p>}
        <div
          className={`mt-3 text-xs px-3 py-1 rounded-full inline-block ${product.bgRemoved
            ? "bg-green-100 text-green-700"
            : "bg-purple-100 text-purple-700"
            }`}
        >
          {product.bgRemoved ? "Background Removed" : "Original Image"}
        </div>

        <div className="flex gap-2 mt-3">
          <button onClick={onEdit} className="text-sm px-3 py-1 border rounded hover:bg-gray-100">
            <Pencil size={14} className="inline mr-1" /> Edit
          </button>
          <Button
            onClick={onDelete}
            className="text-sm px-3 py-1 border rounded text-red-600 hover:bg-red-600 hover:text-white"
          >
            <Trash2 size={14} className="inline mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
