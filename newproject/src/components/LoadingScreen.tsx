import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrandMark } from './BrandMark';

export function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-[#060D1A] text-white"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <BrandMark className="w-16 h-16 shadow-xl shadow-blue-950/60" />
            <div className="text-center">
              <p className="font-display text-sm font-semibold tracking-wide text-slate-100">
                Amit
              </p>
              <p className="text-xs text-slate-400 mt-0.5">BCA Student · Portfolio</p>
            </div>
            <div className="w-36 h-0.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
