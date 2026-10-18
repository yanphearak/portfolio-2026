import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site } from "@/config/site";
import type { SectionId } from "@/config/nav";

// `site.order` decides which sections render and in what order; this only
// says which component draws each one.
const SECTIONS: Record<SectionId, () => React.ReactNode> = {
  about: About,
  skills: Skills,
  education: Education,
  experience: Experience,
  contact: Contact,
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {site.order.map((id) => {
          const Component = SECTIONS[id];
          return <Component key={id} />;
        })}
      </main>
      <Footer />
    </>
  );
}
