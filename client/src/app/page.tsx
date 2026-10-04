import Hero from "@/components/sections/Hero";
import Food from "@/components/sections/Food";
import Menu from "@/components/sections/Menu";
import DiningExperience from "@/components/sections/DiningExperience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Food />
      <Menu />
      <DiningExperience />
      <Contact />
      <Footer />
    </main>
  );
}