"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, IconButton, Typography } from "@mui/material";
import { BiCartAdd, BiHeart } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";
import Image from "../Image/Image";

type props = {
  image?: string;
};
export default function CarouselItem({ image }: props) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [animating, setAnimating] = useState<
    "in" | "out" | "doneIn" | "doneOut"
  >("in");
  const [showContext, setShowContext] = useState(false);
  useEffect(() => {
    if (hovered) {
      setShowContext(true);
      setTimeout(() => {
        setAnimating("in");
      }, 100);
    } else {
      setAnimating("out");
    }

    const removeAnimation = setTimeout(() => {
      if (!hovered) {
        setAnimating("doneOut");
        setShowContext(false);
      } else {
        setAnimating("doneIn");
      }
    }, 500);

    return () => {
      clearTimeout(removeAnimation);
    };
  }, [hovered]);

  return (
    <div
      className="w-full relative h-96 flex isolate items-center justify-center flex-col text-white rounded-md overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        alt="image of carousel"
        src={image}
        className={clsx(
          "size-full object-cover -z-10 object-center inset-0 absolute duration-500",
          {
            "brightness-50": hovered,
            "brightness-100": !hovered,
          }
        )}
      />
      {showContext && (
        <div
          className={clsx(
            "w-[80%] h-fit relative bg-white rounded-md p-3 duration-500 opacity-0 -translate-y-12",
            {
              "animate-fade-in !translate-y-0 duration-500": animating === "in",
              "!translate-y-0 duration-500 !opacity-100":
                animating === "doneIn",
              "animate-fade-out -translate-y-12": animating === "out",
              "-translate-y-12": animating === "doneOut",
            }
          )}
        >
          <Typography
            variant="h6"
            component="b"
            className="text-black flex flex-col mb-2 font-bold relative after:content-[''] after:w-24 after:h-1 after:bg-red-500"
          >
            Product name
          </Typography>
          <Typography variant="body2" component="p" className="text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iusto
            aperiam natus aliquid unde! Hic rerum cupiditate et ea perferendis?
          </Typography>
          <div className="w-fit flex flex-wrap items-start justify-start gap-2 mt-4">
            <Button
              variant="outlined"
              fullWidth
              className="!shrink-0 flex gap-2 items-center justify-center w-full min-[498px]:!w-fit !capitalize !py-1 !text-base !border-black dark:!border-white !text-black dark:!text-white"
            >
              <BiCartAdd />
              Add to cart
            </Button>
            <div className="w-full min-[498px]:w-fit flex items-start justify-start">
              <Button
                variant="contained"
                fullWidth
                className="flex gap-2 items-center justify-center w-full min-[498px]:!w-fit !capitalize !py-1 !text-base !bg-black dark:!bg-white !text-white dark:!text-black"
              >
                <AiFillProduct />
                View Product
              </Button>
              <IconButton
                onClick={() => {
                  if (favorited) {
                    setFavorited(false);
                  } else {
                    setFavorited(true);
                  }
                }}
                className="!shrink-0 relative min-[498px]:top-0 min-[498px]:right-0 !text-base !text-red-500"
              >
                {favorited ? <BsHeartFill /> : <BiHeart />}
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
