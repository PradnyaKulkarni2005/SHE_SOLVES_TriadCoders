import React, { useEffect, useRef } from "react";
import "./Preloader.css"; 
import preloaderVideo from "../assets/preloader.mp4"; // Adjust the path if needed

const Preloader = ({ onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays automatically
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error("Video playback failed:", error));
    }
  }, []);

  return (
    <div className="preloader">
      <video
        ref={videoRef}
        className="preloader-video"
        onEnded={onComplete}
        playsInline
        autoPlay
        muted /* Ensures no audio */
      >
        <source src={preloaderVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Preloader;
