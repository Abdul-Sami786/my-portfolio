"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: "#ffffff",
        },
      }}
      style={{ position: "absolute", zIndex: -1 }}
    />
  );
};

export default ParticlesBackground;
