"use client";
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  return (
    <section id="hero" className="section fade-in">
      <h1>Hello, I’m <span className="highlight">Sami</span></h1>
      <h2>
        <Typewriter
          words={['Software Engineer', 'Frontend Developer', 'Tech Enthusiast']}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>
    </section>
  );
}
