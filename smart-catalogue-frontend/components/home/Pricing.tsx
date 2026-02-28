    export default function Pricing() {
        const plans = [
        {
            name: "Free",
            price: "₹0",
            features: ["10 Products", "Basic Catalogue", "WhatsApp Sharing"],
        },
        {
            name: "Starter",
            price: "₹299/mo",
            features: ["100 Products", "Custom Branding", "Analytics"],
            popular: true,
        },
        {
            name: "Pro",
            price: "₹799/mo",
            features: ["Unlimited Products", "Team Access", "Priority Support"],
        },
        ];
    
        return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-10">
            <h2 className="text-3xl font-bold text-center mb-12">
                Simple, Transparent Pricing
            </h2>
    
            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                <div
                    key={plan.name}
                    className={`rounded-2xl p-8 bg-white shadow ${
                    plan.popular ? "ring-2 ring-purple-500" : ""
                    }`}
                >
                    {plan.popular && (
                    <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                        Most Popular
                    </span>
                    )}
    
                    <h3 className="text-xl font-semibold mt-4">{plan.name}</h3>
                    <p className="text-3xl font-bold mt-2">{plan.price}</p>
    
                    <ul className="mt-6 space-y-2 text-gray-600">
                    {plan.features.map((f) => (
                        <li key={f}>✔ {f}</li>
                    ))}
                    </ul>
    
                    <button className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium">
                    Get Started
                    </button>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    }
    