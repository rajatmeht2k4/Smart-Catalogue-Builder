import { notFound } from "next/navigation";
import { catalogueTemplates } from "@/lib/catalogueTemplates";
import { Business, Product } from "@/lib/catalogueSchema";

export default function CataloguePage() {
  const business: Business = {
    name: "NP MART INDIA",
    tagline: "Premium Drinks",
    brandColor: "#E53935",
    whatsapp: "919999999999",
  };

  const products: Product[] = [
    {
      id: "1",
      name: "Rose Sharbat",
      price: 120,
      image: "https://plus.unsplash.com/premium_photo-1686904394184-d4611dde4bb1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Kesar Sharbat",
      price: 150,
      image: "https://images.unsplash.com/photo-1613549026660-6c5c7a9cae1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      name: "Khus Sharbat",
      price: 130,
      image: "https://images.unsplash.com/photo-1569268418966-f2e71186cc3e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "4",
      name: "Mango Sharbat",
      price: 140,
      image: "https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "5",
      name: "Badam Sharbat",
      price: 180,
      image: "https://images.unsplash.com/photo-1542444592-0d5997f202eb?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "6",
      name: "Thandai Sharbat",
      price: 200,
      image: "https://images.unsplash.com/photo-1616429266184-7455498d96db?q=80&w=1216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "7",
      name: "Jaljeera Sharbat",
      price: 110,
      image: "https://images.unsplash.com/photo-1600791102844-208e695205f6?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "8",
      name: "Pudina Sharbat",
      price: 100,
      image: "https://images.unsplash.com/photo-1668243109041-80a32fc32e71?q=80&w=665&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "9",
      name: "Kala Khatta Sharbat",
      price: 125,
      image: "https://images.unsplash.com/photo-1645179138514-427655060345?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "10",
      name: "Lemon Sharbat",
      price: 90,
      image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }

  ];

  const template = catalogueTemplates.find((t) => t.id === "minimal");
  if (!template) return notFound();

  const Template = template.Full;
  return <Template business={business} products={products} />;
}