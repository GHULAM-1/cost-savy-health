import Footer from "@/components/footer";
import FeatureCards from "@/components/features-card";
import Hero from "@/components/landing-page/hero";
import ShopHealthcare from "@/components/landing-page/shop-health-care";
import Navbar from "@/components/navbar";
import PriceTransparency from "@/components/landing-page/price-transparency";
import Testimonial from "@/components/landing-page/testimonial";
import Enterprise from "@/components/landing-page/enterprise";
import EnterpriseSolutions from "@/components/enterprise-solution";
import JoinTeam from "@/components/landing-page/join-team";
export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <ShopHealthcare />
      <PriceTransparency />
      <Testimonial />
      <Enterprise />
      <EnterpriseSolutions />
      <JoinTeam />
    </>
  );
}
