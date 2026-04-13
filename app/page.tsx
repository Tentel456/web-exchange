import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Statistics from "@/components/home/Statistics";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div 
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/first-page/images/bg.png')" }}
      >
        <Header />
        <main>
          <Hero />
          <Features />
          <Statistics />
        </main>
      </div>
    </div>
  );
}
