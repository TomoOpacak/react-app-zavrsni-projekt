import React, { useRef } from "react";
import beatSound from "../assets/sounds/click.mp3";

const AnimatedButton = ({
  onClick,
  className = "",
  children,
  style = {},
  sound = beatSound,
  ...props
}) => {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const btn = btnRef.current;

    if (btn) {
      btn.classList.remove("clicked");
      void btn.offsetWidth;
      btn.classList.add("clicked");

      setTimeout(() => {
        if (btn) btn.classList.remove("clicked");
      }, 125);
    }

    if (sound) {
      const audio = new Audio(sound);
      audio.play().catch((err) => {
        console.warn("Sound playback failed:", err);
      });
    }

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      className={`${className} clicked-transition`}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
