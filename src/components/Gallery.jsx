import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const dummyData = [
  {
    name: "Ana Popescu",
    message: "Felicitări și toată fericirea din lume!",
    photos: [
      "/uploads/photo1.jpg",
      "/uploads/photo2.jpg",
      "/uploads/photo3.jpg",
    ],
  },
  {
    name: "Mihai Ionescu",
    message: "",
    photos: ["/uploads/photo4.jpg", "/uploads/photo5.jpg"],
  },
];

const Gallery = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const toggleSelect = (photoUrl) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoUrl)
        ? prev.filter((url) => url !== photoUrl)
        : [...prev, photoUrl]
    );
  };

  const handleDownload = (photos) => {
    photos.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      link.click();
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="min-h-screen bg-cream px-6 py-10"
    >
      <h1 className="text-4xl font-serif text-center text-deepgreen mb-10">
        Wedding Memories Gallery
      </h1>

      {/* Butoane de descărcare */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
        <button
          onClick={() => handleDownload(selectedPhotos)}
          disabled={selectedPhotos.length === 0}
          className={`flex items-center gap-2 bg-deepgreen text-white px-6 py-3 rounded-xl font-medium shadow transition 
            ${selectedPhotos.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-900"}`}
        >
          <Download size={18} />
          Download Selected ({selectedPhotos.length})
        </button>

        <button
          onClick={() =>
            handleDownload(dummyData.flatMap((entry) => entry.photos))
          }
          className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-green-900 transition"
        >
          <Download size={18} />
          Download All Photos
        </button>
      </div>

      {/* Galerie persoane */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {dummyData.map((entry, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-xl border border-green-100 flex flex-col items-start"
          >
            <h2 className="text-lg font-bold text-deepgreen mb-1">
              {entry.name}
            </h2>
            {entry.message && (
              <p className="text-gray-600 italic text-sm mb-4">
                {entry.message}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 w-full">
              {entry.photos.map((photoUrl, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-lg border border-green-200"
                >
                  <img
                    src={photoUrl}
                    alt={`photo ${idx}`}
                    className="w-full aspect-[3/4] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <input
                    type="checkbox"
                    checked={selectedPhotos.includes(photoUrl)}
                    onChange={() => toggleSelect(photoUrl)}
                    className="absolute top-2 right-2 w-5 h-5 accent-deepgreen"
                    title="Select photo"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;
