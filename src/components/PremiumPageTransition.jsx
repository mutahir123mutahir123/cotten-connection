import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const transitionConfig = {
  ease: [0.22, 1, 0.36, 1],
  enter: { duration: 0.5 },
  exit: { duration: 0.4 },
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: transitionConfig.enter.duration,
      ease: transitionConfig.ease,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: transitionConfig.exit.duration,
      ease: transitionConfig.ease,
    },
  },
};

const blurredPageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: 'blur(6px)',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PremiumPageTransition({ children, withBlur = false }) {
  const location = useLocation();
  const variants = withBlur ? blurredPageVariants : pageVariants;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PremiumPageTransition;