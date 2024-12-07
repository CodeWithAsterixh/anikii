"use client";

import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { MobileStepper, SxProps, Theme } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";

interface CarouselProps {
  children: React.ReactNode;
  stylings?: {
    container?: { className?: string };
    SwipeableViewsContainer?: {
      className?: string;
      styling?: React.CSSProperties;
    };
    content?: { className?: string; styling?: React.CSSProperties };
    buttons?: { left?: { className?: string }; right?: { className?: string } };
    stepper?: {
      container?: { className?: string };
      stepper?: {
        className?: string;
        sx?: SxProps<Theme>;
      };
    };
  };
  backdropEffect?: {
    colors?: string[];
  };
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  stylings,
  backdropEffect,
}) => {
  const items = React.Children.toArray(children); // Ensure children are an array
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = items.length;

  // Handlers for next and previous buttons
  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep === 0 ? maxSteps - 1 : prevStep - 1));
  };

  // Swipe handler for changing index
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div
      className={clsx(
        "relative isolate w-full overflow-hidden pt-1 bg-white dark:bg-black",
        stylings?.container?.className
      )}
    >
      {backdropEffect?.colors && (
        <div
          className="size-full opacity-50 duration-500 scale-[.75] delay-200 top-1/2 -translate-y-1/2 rounded-full blur-3xl absolute inset-0 -z-20"
          style={{
            backgroundColor: backdropEffect?.colors[activeStep],
          }}
        />
      )}
      {/* Swipeable Views */}
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        className={clsx(
          "flex justify-center items-center",
          stylings?.SwipeableViewsContainer?.className
        )}
        containerStyle={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          ...stylings?.SwipeableViewsContainer?.styling,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "transition-all duration-500 ease-in-out",
              activeStep === index
                ? "scale-100 opacity-100 z-10"
                : "scale-95 opacity-50 z-0 pointer-events-none",
              stylings?.content?.className
            )}
            style={{
              width: "100%",
              flexShrink: 0,
              ...stylings?.content?.styling,
            }}
          >
            {item}
          </div>
        ))}
      </SwipeableViews>

      {/* Navigation Buttons */}
      <button
        onClick={handleBack}
        className={clsx(
          "absolute top-1/2 left-3 -translate-y-1/2 z-20 p-2 focus:!outline-0 text-black bg-white rounded-full shadow-md hover:bg-gray-200",
          stylings?.buttons?.left?.className
        )}
        aria-label="Previous"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className={clsx(
          "absolute top-1/2 right-3 -translate-y-1/2 z-20 p-2 focus:!outline-0 text-black bg-white rounded-full shadow-md hover:bg-gray-200",
          stylings?.buttons?.right?.className
        )}
        aria-label="Next"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Stepper with Gradient Background */}
      <div
        className={clsx(
          "w-full bg-transparent mt-3 p-2",
          stylings?.stepper?.container?.className
        )}
      >
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={clsx(stylings?.stepper?.stepper?.className)}
          sx={{
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            ".MuiMobileStepper-dot": {
              backgroundColor: "gray",
              transitionDuration: "500ms",
              transition: "width",
              opacity: 0.5,
              width: "8px",
            },
            ".MuiMobileStepper-dotActive": {
              backgroundColor: "#ef4444 ",
              width: "20px",
              borderRadius: "4px",
              transition: "width",
              transitionDuration: "500ms",
              opacity: 1,
            },
            ...stylings?.stepper?.stepper?.sx,
          }}
          backButton={<div />} // Prevents MUI warning for missing backButton
          nextButton={<div />} // Prevents MUI warning for missing nextButton
        />
      </div>
    </div>
  );
};

export default Carousel;
