"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";

export default function CreateShopPage() {
  const [shopName, setShopName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = async () => {
    if (!shopName || !email || !password || !whatsappNumber)
      return alert("Fill all fields");

    setLoading(true);

    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopName,
        whatsappNumber,
        email,
        password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return alert(data.error || "Signup failed");

    localStorage.setItem("token", data.token);
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Your Shop 🚀
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Launch your online catalogue in minutes
        </p>

        <div className="space-y-4">
          <input
            className="border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />

          <input
            className="border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="WhatsApp Number"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />

          <input
            className="border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={signup}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Create Shop"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
