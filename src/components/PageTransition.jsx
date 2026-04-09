import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'exit' | 'enter' | 'idle'
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Skip on initial mount
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    // Start exit animation
    setTransitioning(true);
    setPhase('exit');

    const exitTimer = setTimeout(() => {
      // Swap content and scroll to top
      setDisplayChildren(children);
      window.scrollTo(0, 0);
      setPhase('enter');

      const enterTimer = setTimeout(() => {
        setPhase('idle');
        setTransitioning(false);
      }, 500);

      return () => clearTimeout(enterTimer);
    }, 350);

    return () => clearTimeout(exitTimer);
  }, [location.pathname, children]);

  // Update children when not transitioning (for same-page re-renders)
  useEffect(() => {
    if (!transitioning) {
      setDisplayChildren(children);
    }
  }, [children, transitioning]);

  return (
    <div className={`page-transition page-transition--${phase}`}>
      {displayChildren}
    </div>
  );
}
