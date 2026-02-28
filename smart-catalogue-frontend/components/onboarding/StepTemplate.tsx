"use client";

import { catalogueTemplates } from "@/lib/catalogueTemplates";
import { Check } from "lucide-react";

export default function StepTemplate({ formData, setFormData }: any) {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-2">Choose Your Catalogue Style</h2>
        <p className="text-gray-500 mb-6 text-sm">
          This is how your catalogue will look to customers
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {catalogueTemplates.map((tpl) => {
          const SelectedPreview = tpl.Preview;
          const isSelected = formData.templateId === tpl.id;

          return (
            <div
              key={tpl.id}
              onClick={() =>
                setFormData((prev: any) => ({
                  ...prev,
                  templateId: tpl.id,
                }))
              }
              className={`relative rounded-xl p-4 cursor-pointer border transition ${isSelected
                  ? "border-purple-500 ring-2 ring-purple-300"
                  : "border-gray-200 hover:border-purple-400"
                }`}
            >
              {/* Tick Badge */}
              {isSelected && (
                <div className="absolute -top-3 -right-3 z-10 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                  <Check size={18} strokeWidth={3} />
                </div>
              )}

              <div className="w-full max-w-[360px] mx-auto">
                <SelectedPreview />
              </div>

              <div className="mt-3 text-center">
                <h3 className="font-semibold">{tpl.name}</h3>
                <p className="text-sm text-gray-500">{tpl.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}