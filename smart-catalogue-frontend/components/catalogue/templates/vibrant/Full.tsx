// components/catalogue/templates/minimal/Full.tsx
export default function VibrantFull({ business, products }: any) {
    return (
      <div className="bg-white min-h-screen">
        <header className="p-6 border-b">
          <h1 className="text-3xl font-bold">{business.businessName}</h1>
          <p className="text-gray-500">{business.tagline}</p>
        </header>
  
        <main className="p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p: any, i: number) => (
            <div key={i} className="border rounded-xl p-4 hover:shadow-lg transition">
              <img src={p.image} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">₹{p.price}</p>
            </div>
          ))}
        </main>
      </div>
    );
  }