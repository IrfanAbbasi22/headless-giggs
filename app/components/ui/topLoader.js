'use client';

import { motion, useAnimation } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function TopLoader() {
  const controls = useAnimation();
  const pathname = usePathname(); // Tracks the current route

  useEffect(() => {
    const startLoader = async () => {
      // Start the animation
      await controls.start({
        width: ['0%', '80%'], // Loader progresses to 80%
        transition: { duration: 1.5, ease: 'easeInOut' },
      });
    };

    const completeLoader = async () => {
      // Complete the animation
      await controls.start({
        width: '100%', // Loader progresses to 100%
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      // Reset the loader for the next route change
      controls.set({ width: '0%' });
    };

    startLoader(); // Trigger start animation on route change

    // Complete animation after route is loaded
    setTimeout(() => {
      completeLoader();
    }, 500);

    // Clean up on route change
    return () => controls.stop();
  }, [pathname, controls]);

  return (
    <motion.div
      animate={controls}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        backgroundColor: '#ff4500',
        zIndex: 9999,
      }}
      initial={{ width: '0%' }} // Initial state
    />
  );
}
