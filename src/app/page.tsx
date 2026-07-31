import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Timeline from "@/components/Timeline";
import Sandbox from "@/components/Sandbox";
import EngineeringAdvantage from "@/components/EngineeringAdvantage";
import Achievements from "@/components/Achievements";
import InteractiveCanvasBoard from "@/components/InteractiveCanvasBoard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white flex flex-col">
      <Header />
      <div className="flex-1">
        <Hero />
        <SelectedWork />
        <Timeline />
        <Sandbox />
        <EngineeringAdvantage />
        <Achievements />
        <InteractiveCanvasBoard />
      </div>
      <Footer />
    </main>
  );
}
