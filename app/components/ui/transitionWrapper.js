'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function TransitionWrapper({ children }) {
  const pathname = usePathname(); // Reactively tracks the current route

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Ensures unique animations for each route
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
