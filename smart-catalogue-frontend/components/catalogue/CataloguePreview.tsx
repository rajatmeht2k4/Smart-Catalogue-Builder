"use client";

import { CatalogueProduct } from "@/lib/mockCatalogueProducts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export default function CataloguePreview({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: CatalogueProduct[];
}) {
  return (
    <Card className="overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3">
          <Wand2 className="w-7 h-7 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-purple-100 text-sm">{description}</p>
      </div>

      <div className="p-4 space-y-4">
        {products.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <img src={p.image} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-purple-600 text-sm mb-2">{p.price}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  Buy Now
                </Button>
                <Button size="sm" variant="outline">
                  Ask Query
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
