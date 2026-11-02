import Hero from "@/components/sections/Hero";
import GMDivider from "@/components/ui/GMDivider";
import ExploreOurFood from "@/components/sections/ExploreOurFood";
import Menu from "@/components/sections/Menu";
import DiningExperience from "@/components/sections/DiningExperience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <GMDivider leftText="Golden Moment" rightText="Canberra · ACT" />
      <ExploreOurFood />
      <Menu />
      <DiningExperience />
      <Contact />
      <Footer />
    </main>
  );
}