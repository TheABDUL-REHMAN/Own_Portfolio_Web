'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiArrowRightCircle } from 'react-icons/fi';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function HeroSection() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(200);
  const period = 2000;
  const heroRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowWidth, setWindowWidth] = useState(1200); // default value for SSR
  const [windowHeight, setWindowHeight] = useState(800);

  // Parallax effect values
  const x1 = useTransform(mouseX, [0, windowWidth], [-20, 20]);
  const x2 = useTransform(mouseX, [0, windowWidth], [20, -20]);
  const y1 = useTransform(mouseY, [0, windowHeight], [-10, 10]);
  const y2 = useTransform(mouseY, [0, windowHeight], [10, -10]);

  // Static particles to prevent hydration mismatch
  const particles = [
    { id: 0, size: 3, left: 10, top: 20, duration: 15 },
    { id: 1, size: 4, left: 80, top: 10, duration: 18 },
    { id: 2, size: 2, left: 30, top: 70, duration: 12 },
    { id: 3, size: 5, left: 60, top: 40, duration: 20 },
    { id: 4, size: 3, left: 90, top: 80, duration: 14 },
    { id: 5, size: 4, left: 20, top: 90, duration: 16 },
    { id: 6, size: 2, left: 70, top: 30, duration: 13 },
    { id: 7, size: 6, left: 40, top: 60, duration: 19 },
    { id: 8, size: 3, left: 85, top: 50, duration: 17 },
    { id: 9, size: 4, left: 15, top: 80, duration: 15 }
  ];

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  const tick = useCallback(() => {
    const toRotate = ["Web Developer", "MERN Stack Developer", "UI/UX Designer"];
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) setDelta((prev) => prev / 2);
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200);
    }
  }, [loopNum, isDeleting, text, period]);

  // Text animation
  useEffect(() => {
    let ticker = setInterval(() => tick(), delta);
    return () => clearInterval(ticker);
  }, [tick, delta]);

  // Handle mouse movement for parallax
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Animate numbers
  const [projectsCount, setProjectsCount] = useState(0);
  const [experienceYears, setExperienceYears] = useState(0);
  
  useEffect(() => {
    const projectsAnimation = animate(0, 20, {
      duration: 2,
      onUpdate: (value) => setProjectsCount(Math.floor(value))
    });
    const experienceAnimation = animate(0, 1.5, {
      duration: 2,
      onUpdate: (value) => setExperienceYears(Math.floor(value))
    });
    
    return () => {
      projectsAnimation.stop();
      experienceAnimation.stop();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden "
      onMouseMove={handleMouseMove}
    >
      {/* Lightweight CSS Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-purple-400 opacity-20 animate-pulse"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
     
      <motion.div 
        className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl opacity-10"
        style={{ x: x2, y: y2 }}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-20 max-w-4xl mx-auto mt-25"
      >
        {/* Welcome text with animated border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block relative mb-6"
        >
          <span className="block text-lg text-purple-300 mb-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 backdrop-blur-sm">
            Welcome to my Website
          </span>
        </motion.div>

    
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span className="inline-block">
            Hi, I&#39;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">ABDUL REHMAN</span>
          </span>
          <br />
          <span className="inline-flex items-center">
            <span className="text-purple-300">{text}</span>
            <span className="block w-1 h-12 bg-purple-400 ml-2 animate-pulse"></span>
          </span>
        </motion.h1>

      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative inline-block mb-10"
        >
          <p className="text-gray-300 text-sm md:text-base mb-8 mx-auto max-w-2xl">
            I build scalable web apps with the MERN stack (MongoDB, Express, React, Node.js).
            Passionate about clean code, intuitive UX, and solving real-world problems.
          </p>
          <motion.div 
            className="absolute bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>

        <motion.div 
          className="flex justify-center gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
              <span>{projectsCount}</span>+
            </div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
              <span>{experienceYears}</span>+
            </div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
              <span>100</span>%
            </div>
            <div className="text-sm text-gray-400">Passion</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ y: -5 }}
          className="inline-block"
        >
          <button
            onClick={() => console.log("connect")}
            className="group relative overflow-hidden bg-gradient-to-r from-[#9854FF] to-[#442AC6] hover:from-[#442AC6] hover:to-[#9854FF] text-white py-4 px-10 rounded-lg transition-all duration-500 flex items-center mx-auto shadow-xl hover:shadow-[0_10px_30px_-5px_rgba(152,84,255,0.3)]"
          >
            <span className="relative z-10 flex items-center">
              Let&#39;s Connect
              <FiArrowRightCircle className="ml-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#442AC6] to-[#9854FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}