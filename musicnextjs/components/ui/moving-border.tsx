"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";

/* ===================== BUTTON ===================== */

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px]",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      {/* Moving border */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-80",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      {/* Button content */}
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-[inherit] border border-slate-800 bg-slate-900/80 text-sm text-white backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}

/* ===================== MOVING BORDER ===================== */

export function MovingBorder({
  children,
  duration = 3000,
  rx = "0",
  ry = "0",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const pxPerMs = length / duration;
    progress.set((time * pxPerMs) % length);
  });

  const x = useTransform(progress, (val) => {
    const path = pathRef.current;
    return path ? path.getPointAtLength(val).x : 0;
  });

  const y = useTransform(progress, (val) => {
    const path = pathRef.current;
    return path ? path.getPointAtLength(val).y : 0;
  });

  const transform = useMotionTemplate`
    translateX(${x}px)
    translateY(${y}px)
    translateX(-50%)
    translateY(-50%)
  `;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        {...otherProps}
      >
        <rect
          ref={pathRef}
          width="100%"
          height="100%"
          fill="none"
          rx={rx}
          ry={ry}
        />
      </svg>

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
