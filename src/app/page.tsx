import Footer from "@/components/footer";
import FeatureCards from "@/components/features-card";
import Hero from "@/components/landing-page/hero";
import ShopHealthcare from "@/components/landing-page/shop-health-care";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureCards />
      <ShopHealthcare />
      <Footer />
    </>
  );
}
