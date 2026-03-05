import { notFound } from "next/navigation";
import { catalogueTemplates } from "@/lib/catalogueTemplates";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CataloguePage({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(
    `http://localhost:5000/api/business/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const { business, products } = await res.json();

  const template = catalogueTemplates.find(
    (t) => t.id === business.templateId
  );

  if (!template) return notFound();

  const Template = template.Full;

  return <Template business={business} products={products} />;
}