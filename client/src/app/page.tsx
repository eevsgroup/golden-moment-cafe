import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Food from "@/components/sections/Food";
import Menu from "@/components/sections/Menu";
import DiningExperience from "@/components/sections/DiningExperience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <Food />
      <Menu />
      <DiningExperience />
      <Contact />
      <Footer />
    </main>
  );
}