"use client";

import { useRef } from "react";
import { motion, useTransform, useInView, MotionValue } from "framer-motion";

interface AnimatedScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedScrollSection({ children, className = "" }: AnimatedScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollProgressIndicatorProps {
  scrollYProgress: MotionValue<number>;
}

export function ScrollProgressIndicator({ scrollYProgress }: ScrollProgressIndicatorProps) {
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-brand-100/30 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-800 via-purple-600 to-pink-600"
        style={{ width }}
      />
    </div>
  );
}

