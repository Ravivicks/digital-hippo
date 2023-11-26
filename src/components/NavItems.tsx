"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import React, { useRef } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;
  const navRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <>
      <div className="flex gap-4 h-full" ref={navRef}>
        {PRODUCT_CATEGORIES.map((category, i) => {
          const handleOpen = () => {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          };

          const isOpen = i === activeIndex;
          return (
            <NavItem
              category={category}
              handleOpen={handleOpen}
              isOpen={isOpen}
              isAnyOpen={isAnyOpen}
              key={i}
            />
          );
        })}
      </div>
    </>
  );
};

export default NavItems;
