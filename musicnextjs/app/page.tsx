import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import  Featuredcourses from "@/components/Featuredcourses"

export default function Home() {
  return (
 <main className="min-h-secreen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
  <HeroSection/>
  <Featuredcourses/>
 </main>
  );
}
