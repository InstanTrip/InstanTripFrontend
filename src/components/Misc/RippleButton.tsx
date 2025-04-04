import React, { useState, useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default function Ripple({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        setContainerSize({
          width: containerRef.current?.offsetWidth || 0,
          height: containerRef.current?.offsetHeight || 0
        });
      };

      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const createRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  return (
    <Box
      ref={containerRef}
      position="relative"
      overflow="hidden"
      onClick={createRipple}
      cursor="pointer"
      width="100%"
      height="100%"
    >
      {children}
      {ripples.map((ripple) => {
        const size = Math.max(containerSize.width, containerSize.height) * 2;
        
        return (
          <Box
            key={ripple.id}
            position="absolute"
            borderRadius="50%"
            bg="rgba(0, 0, 0, 0.07)"
            transform="translate(-50%, -50%) scale(0)"
            width={`${size}px`}
            height={`${size}px`}
            left={`${ripple.x}px`}
            top={`${ripple.y}px`}
            animation="ripple 0.6s linear"
            pointerEvents="none"
          />
        );
      })}
      <style>
        {`
          @keyframes ripple {
            to {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
  );
}
