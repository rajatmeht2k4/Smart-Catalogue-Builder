import { notFound } from "next/navigation";
import { catalogueTemplates } from "@/lib/catalogueTemplates";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CataloguePage({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(
    `http://localhost:5000/api/business/${slug}`,
    { cache: "no-store" } // Server components fetch
  );

  if (!res.ok) return notFound();

  const { business, products } = await res.json();

  // Only show active products and sort by order
  const activeProducts = products
    .filter((p: any) => p.isActive !== false)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const template = catalogueTemplates.find(
    (t) => t.id === business.templateId
  );

  if (!template) return notFound();

  const Template = template.Full;

  return (
    <>
      <AnalyticsTracker businessId={business._id} />
      <Template business={business} products={activeProducts} />
    </>
  );
}