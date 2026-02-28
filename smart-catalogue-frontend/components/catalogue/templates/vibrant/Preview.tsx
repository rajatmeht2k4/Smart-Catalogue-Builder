import MinimalFull from "./Full";

export default function VibrantPreview() {
  const demoBusiness = {
    businessName: "NP Mart",
    tagline: "Premium Drinks",
  };

  const demoProducts = [
    { name: "Rose Sharbat", price: 120, image: "/demo/product.jpg" },
  ];

  return (
    <div className="scale-[0.7] origin-top-left pointer-events-none">
      <div className="w-[360px] h-[240px] overflow-hidden rounded-xl border">
        <MinimalFull business={demoBusiness} products={demoProducts} />
      </div>
    </div>
  );
}