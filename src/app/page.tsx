import Footer from "@/components/footer";
import FeatureCards from "@/components/features-card";
import Hero from "@/components/landing-page/hero";
import ShopHealthcare from "@/components/landing-page/shop-health-care";
import Navbar from "@/components/navbar";
import PriceTransparency from "@/components/landing-page/price-transparency";
import Testimonial from "@/components/testimonial";
import Enterprise from "@/components/landing-page/enterprise";
import EnterpriseSolutions from "@/components/enterprise-solution";
import JoinTeam from "@/components/landing-page/join-team";
import quotation from "../../public/Testimonial/Quotation.webp";
export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <FeatureCards />
      <ShopHealthcare />
      <PriceTransparency />
      <Testimonial
        image={quotation}
        testimonial="I recently got a few confusing bills from a hospital, and the tool gave me confidence that I wasn't being overcharged for certain procedures."
      />
      <Enterprise />
      <EnterpriseSolutions />
      <JoinTeam />
    </>
  );
}
