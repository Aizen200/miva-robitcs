import { Header, Preloader } from "@/components/chrome";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import {
  Cta,
  Features,
  Footer,
  Industries,
  Posts,
  SmartPlants,
  Stats,
  Testimonials,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Features />
        <SmartPlants />
        <Products />
        <Industries />
        <Stats />
        <Testimonials />
        <Posts />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
