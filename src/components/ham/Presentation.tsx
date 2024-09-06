import * as Ham from "@svta/common-media-library/cmaf-ham";
import SelectionSet from "./SelectionSet";
import { AnimatePresence, motion } from "framer-motion";
import {
  PresentationContext,
  PresentationContextType,
} from "../../context/PresentationContext";
import { useContext, useEffect, useRef, useState } from "react";
import ScrollArrow from "../../assets/icons/arrow-scroll.svg?react";
export default function Presentation() {
  const { presentation } = useContext(
    PresentationContext,
  ) as PresentationContextType;

  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const element = sliderRef.current;
    if (element) {
      const checkScroll = () => {
        setCanScrollLeft(element.scrollLeft > 0);
        setCanScrollRight(
          element.scrollWidth > element.clientWidth &&
            element.scrollLeft + element.clientWidth < element.scrollWidth,
        );
      };

      checkScroll();

      window.addEventListener("resize", checkScroll);
      element.addEventListener("scroll", checkScroll); // Update on scroll

      return () => {
        window.removeEventListener("resize", checkScroll);
        element.removeEventListener("scroll", checkScroll);
      };
    }
  }, []);

  const scrollRight = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstElementChild?.clientWidth;
      sliderRef.current.scrollLeft += itemWidth || 100;
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstElementChild?.clientWidth;
      sliderRef.current.scrollLeft -= itemWidth || 100;
    }
  };

  const animationArrowButton = {
    hidden: {
      opacity: 0,
      scale: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.1,
      },
    },
    hover: {
      scale: 0.95,
    },
  };

  return (
    <motion.div className="content-horizontal-container" ref={sliderRef}>
      {presentation?.selectionSets.map((selectionSet: Ham.SelectionSet) => (
        <SelectionSet
          selectionSet={selectionSet}
          key={`selection-set-item-${selectionSet.id}`}
        />
      ))}
      <AnimatePresence>
        {canScrollRight ? (
          <motion.button
            onClick={scrollRight}
            className="scroll-button"
            variants={animationArrowButton}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
          >
            <ScrollArrow />
          </motion.button>
        ) : null}
        {canScrollLeft ? (
          <motion.button
            onClick={scrollLeft}
            className="scroll-button left"
            variants={animationArrowButton}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
          >
            <ScrollArrow />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
