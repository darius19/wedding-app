// src/components/PageTransition.jsx
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/AnimationWedding.json";

const PageTransition = ({ onComplete }) => {
  const lottieRef = useRef();
  const [startFadeOut, setStartFadeOut] = useState(false);

  useEffect(() => {
    const duration = (animationData.op / animationData.fr) * 1000;

    const timeout = setTimeout(() => {
      setStartFadeOut(true);
      // navigarea se face imediat ce începe fade out-ul
      onComplete();
    }, duration - 300); // ușor înainte de finalul animației

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] bg-white flex items-center justify-center transition-opacity duration-500 ${startFadeOut ? "opacity-0" : "opacity-100"
        } pointer-events-none`}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default PageTransition;
