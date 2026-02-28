import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/home/Features";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/home/Footer";
import CTA  from "@/components/home/CTA";
import Testimonials from "@/components/home/Testimonials";
// import Testimonials from "@/components/Testimonials";
// import CTA from "@/components/CTA";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
