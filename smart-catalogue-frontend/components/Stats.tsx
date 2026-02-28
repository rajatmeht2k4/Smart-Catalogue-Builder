export default function Stats() {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10,000+", "Active Businesses"],
            ["1M+", "Products Listed"],
            ["5M+", "Catalogue Views"],
            ["98%", "Customer Satisfaction"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold text-purple-600">{value}</div>
              <div className="text-gray-600 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  