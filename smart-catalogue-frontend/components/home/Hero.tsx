import { Button } from "../ui/button";

export default function Hero() {
  const productImages = [
    "https://images.unsplash.com/photo-1613549026660-6c5c7a9cae1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1569268418966-f2e71186cc3e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542444592-0d5997f202eb?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1616429266184-7455498d96db?q=80&w=1216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600791102844-208e695205f6?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1668243109041-80a32fc32e71?q=80&w=665&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1645179138514-427655060345?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dp",
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section className="bg-[#faf7ff]">
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
            Trusted by 10,000+ Small Businesses
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Create Stunning{" "}
            <span className="text-purple-600">Product Catalogues</span> in Minutes
          </h1>

          <p className="mt-4 text-gray-600 max-w-lg">
            Perfect for home bakers, artisans, and small businesses. Share beautiful catalogues on WhatsApp with just one click.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-medium">
              Start Free Trial →
            </Button>
            <span className="text-sm text-gray-500">No credit card required</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="relative">
          <div className="rounded-2xl bg-white shadow-xl p-6 grid grid-cols-3 gap-4">
            {productImages.map((img, i) => (
              <div
                key={i}
                className="h-24 rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={img}
                  alt="Product"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>

          <div className="absolute -top-4 -left-4 bg-white shadow-md px-3 py-1 rounded-full text-sm">
            WhatsApp Queries <span className="text-green-600 font-semibold">+156%</span>
          </div>

          <div className="absolute bottom-4 right-4 bg-white shadow-md px-3 py-1 rounded-full text-sm">
            Orders <span className="text-purple-600 font-semibold">3x Growth</span>
          </div>
        </div>
      </div>
    </section>
  );
}