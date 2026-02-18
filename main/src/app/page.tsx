import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ReferenceSection from "@/components/ReferenceSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 15, color: "#333", margin: 0 }}>
      <TopBar />
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <ReferenceSection />
      <ActivitiesSection />
      <CTABanner />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
