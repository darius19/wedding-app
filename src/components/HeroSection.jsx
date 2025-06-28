import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";

const HeroSection = () => {
  const [files, setFiles] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleClickUploadArea = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    setIsTransitioning(true);
  };

  useEffect(() => {
    const enableAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.2;
        audioRef.current.play().catch(() => { });
        setIsMuted(false);
        setShowPrompt(false);
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
    <div className="relative w-full h-screen flex flex-col justify-between text-center overflow-hidden">
      {isTransitioning && (
        <PageTransition onComplete={() => navigate("/gallery")} />
      )}

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        src="/assets/couple.jpeg"
        alt="Wedding couple"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/80 text-deepgreen px-4 py-2 rounded-xl text-sm font-medium z-30 shadow"
        >
          🎵 Click anywhere to enable music
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-20 flex flex-col items-center justify-center flex-grow px-4 text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl font-serif font-bold mb-2"
        >
          Share the <span className="italic">Love</span>
        </motion.h1>
        <p className="text-lg mb-6">
          Capture & Share Precious Moments <br />
          from Our Wedding Celebration
        </p>

        <div className="bg-cream bg-opacity-90 p-4 rounded-xl shadow-md w-full max-w-md">
          <div
            className="border-2 border-dashed border-green-900 p-4 rounded-md mb-4 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleClickUploadArea}
          >
            <p className="text-gray-700">
              Drag and drop your photos here <br /> or click to select
            </p>
            <input
              type="file"
              className="hidden"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <input
            type="text"
            placeholder="Your name"
            className="w-full p-2 rounded bg-white border mb-2 text-gray-800"
          />

          <input
            type="text"
            placeholder="Leave a message for the couple (optional)"
            className="w-full p-2 rounded bg-cream border border-green-100 text-gray-800 mb-4"
          />

          <button
            onClick={handleUpload}
            className="w-full bg-deepgreen text-white font-semibold py-2 rounded-xl"
          >
            Upload Selected Photos
          </button>

          {files.length > 0 && (
            <ul className="mt-4 grid grid-cols-4 gap-2">
              {files.map((file, index) => (
                <li key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    className="w-20 h-20 object-cover rounded shadow-sm group-hover:brightness-75 transition"
                  />
                  <button
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute top-0 right-0 bg-white text-black rounded-full p-0.5 text-xs m-0.5 hover:bg-gray-200"
                    title="Remove photo"
                  >
                    <X size={12} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 text-white text-sm">
          {files.length === 0 ? (
            <>
              <p className="font-medium">No photos uploaded yet.</p>
              <p>Be the first to share your memories!</p>
            </>
          ) : (
            <p className="font-medium">
              {files.length} photo{files.length > 1 && "s"} selected.
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="z-20 mb-6 text-white"
      >
        <p className="text-xs tracking-widest">SAVE THE DATE</p>
        <p className="text-2xl font-serif">July 19th, 2025</p>
      </motion.div>



      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-30 bg-white/70 text-deepgreen px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md shadow"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export default HeroSection;