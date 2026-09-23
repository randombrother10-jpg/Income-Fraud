import CustomCursor from "../components/common/CustomCursor";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Marquee from "../components/home/Marquee";
import HowItWorks from "../components/home/HowItWorks";
import VideoSection from "../components/home/VideoSection";
import TrustSection from "../components/home/TrustSection";
import CurrencySection from "../components/home/CurrencySection";
import Contact from "../components/home/Contact";
import About from "../components/home/About";
import Footer from "../components/home/Footer";

// Same sections, same order as your original index.html.
export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <HowItWorks />
      <VideoSection />
      <TrustSection />
      <CurrencySection />
      <Contact />
      <About />
      <Footer />
    </>
  );
}
