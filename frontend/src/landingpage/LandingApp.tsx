import "./styles/globals.css"; 
import { Header } from "./components/Header";
import  HeroSection  from "./components/Hero";
import { Features } from "./components/Features";
import { Services } from "./components/Services";
import { Security } from "./components/Security";
import { MobileApp } from "./components/MobileApp";
import { Testimonials } from "./components/Testimonials";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export default function LandingApp() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <Services />
        <Security />
        <MobileApp />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}