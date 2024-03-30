"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "react-spring";
import Typewriter from "typewriter-effect";
import "../styles/landingPage.css";

export default function LandingPage() {
  const canvasRef = useRef();
  const globeRef = useRef();
  const pointerInteracting = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const [{ r, th }, api] = useSpring(() => ({
    r: 0,
    th: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 2, 3],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [0, 0, 0],
      markers: [{ location: [15.458924, 75.007805], size: 0.09 }],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi =0+r.get();
        state.theta = th.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    globeRef.current = globe;

    setTimeout(() => (canvasRef.current.style.opacity = "1"));

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handlePointerDown = (e) => {
    pointerInteracting.current = true;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    canvasRef.current.style.cursor = "grabbing";
  };

  const handlePointerMove = (e) => {
    if (pointerInteracting.current) {
      const deltaX = e.clientX - pointerStart.current.x;
      const deltaY = e.clientY - pointerStart.current.y;
      pointerStart.current = { x: e.clientX, y: e.clientY };
      if (canvasRef.current.contains(e.target)) {
        api.start({
          r: deltaX / 5,
          th: deltaY / 5,
        });
      }
    }
  };
  
  const handlePointerUp = () => {
    if (pointerInteracting.current) {
      pointerInteracting.current = false;
      canvasRef.current.style.cursor = "grab";
    }
  };
  

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      handlePointerDown(e.touches[0]);
    }
  };

  const handleTouchMove = (e) => {
    if (pointerInteracting.current && e.touches.length === 1) {
      handlePointerMove(e.touches[0]);
    }
  };

  const handleTouchEnd = () => {
    handlePointerUp();
  };

  return (
    <div className="loadingPageContain">
      <div className="bgImage">
        <img src="https://www.pngall.com/wp-content/uploads/13/Grid-PNG-File.png" />
      </div>
      <div className="leftLoadingPage">
        <div className="siteName">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("ProximiChat")
                .pauseFor(1000)
                .start();
            }}
          />
        </div>
        <div className="siteTagline">Join the Chat Scene Near You</div>
        <div>
          <button className="btn">Continue</button>
        </div>
      </div>
      <div
        className="rightLoadingPage"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <canvas className="globe" ref={canvasRef} />
      </div>
    </div>
  );
}
