"use client";

import createGlobe from 'cobe'
import { useEffect, useRef } from "react";
import '../styles/landingPage.css'
import { useSpring } from 'react-spring';
import Typewriter from 'typewriter-effect';
import Grid from  '../assets/Grid.png'


export default function LandingPage() {
  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r,th }, api] = useSpring(() => ({
    r: 0,
    th:0,
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
    let theta=0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
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
      markers: [
        { location: [15.458924, 75.007805], size: 0.09 }
      ],
      onRender: (state) => {
        // This prevents rotation while dragging
        if (!pointerInteracting.current) {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          phi += 0.005
        }
        state.phi = phi + r.get()
        state.theta = theta + th.get()
        state.width = width * 2
        state.height = width * 2
      }
    })
    setTimeout(() => canvasRef.current.style.opacity = '1')
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    }
  }, [])

  return (
    <div className='loadingPageContain'>
      <div className='bgImage'><img src='https://www.pngall.com/wp-content/uploads/13/Grid-PNG-File.png'/></div>
      <div className='leftLoadingPage'>
        <div className='siteName'><Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("ProximiChat").pauseFor(1000).start();
            }}
          /></div>
        <div className='siteTagline'>Join the Chat Scene Near You</div>
        <div><button class="btn">Continue</button></div>
      </div>
      <div className='rightLoadingPage'>
        <canvas
          className='globe'
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              const thetaMove=e.clientY-pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 200,
                th:thetaMove/900
              });
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              const thetaMove=e.clientY-pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 100,
                th:thetaMove/900

              });
            }
          }}
        />
      </div>
    </div>
  );
}
