import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Gallery from "./components/Gallery";
import PageTransition from "./components/PageTransition";
import { useRef, useEffect, useState } from "react";

function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const enableAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.2;
        audioRef.current.play().catch(() => { });
        setIsMuted(false);
      }
    };
    window.addEventListener("click", enableAudio, { once: true });
    return () => window.removeEventListener("click", enableAudio);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !audioRef.current.muted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <>
      {/* Muzica globală */}
      <audio
        ref={audioRef}
        src="/assets/piano.mp3"
        autoPlay
        muted
        loop
        className="hidden"
      />

      {/* Buton Unmute global */}
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 bg-white/70 text-deepgreen px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md shadow"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>

      {/* Pagini */}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pagetransition" element={<PageTransition />} />
      </Routes>
    </>
  );
}

export default App;
