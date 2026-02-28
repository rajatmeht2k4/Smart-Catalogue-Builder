import { MessageCircle, Image, Link2, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "One-Click WhatsApp Sharing",
      desc: "Share your catalogue instantly with customers on WhatsApp.",
      icon: MessageCircle,
    },
    {
      title: "AI Background Removal",
      desc: "Make your product photos professional in one click.",
      icon: Image,
    },
    {
      title: "Live Catalogue Link",
      desc: "No PDFs. Get a live shareable link for your products.",
      icon: Link2,
    },
    {
      title: "Analytics & Insights",
      desc: "Track views, clicks and customer interest.",
      icon: BarChart3,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Why SmartCatalogue?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f) => {
          const Icon = f.icon;

          return (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 mb-4 flex items-center justify-center text-white">
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-lg text-gray-900">
                {f.title}
              </h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}