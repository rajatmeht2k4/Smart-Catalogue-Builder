export default function Testimonials() {
    const testimonials = [
      {
        name: "Naman Mehta",
        company: "NP Mart India",
        text: "SmartCatalogue transformed my drink business! I now get 3x more orders through WhatsApp.",
      },
      {
        name: "Rahul Mehta",
        company: "Handmade Jewels",
        text: "The analytics feature helps me understand which products my customers love the most.",
      },
      {
        name: "Anita Desai",
        company: "Organic Soaps Co.",
        text: "Creating my catalogue was so easy! Within 10 minutes, I was ready to share with customers.",
      },
    ];
  
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-3">Loved by Business Owners</h2>
          <p className="text-gray-500 mb-12">
            See what our customers have to say
          </p>
  
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="border rounded-2xl p-8 text-left shadow-sm hover:shadow-md transition"
              >
                <div className="text-yellow-400 mb-3">★★★★★</div>
                <p className="text-gray-700 italic mb-6">"{t.text}"</p>
  
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  