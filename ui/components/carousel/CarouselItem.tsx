"use client";

import { AnimeListItem } from "@/lib/types/anime/__animeListItem";
import { Button, Chip, IconButton, Typography } from "@mui/material";
import clsx from "clsx";
import { BiPlayCircle, BiPlus, BiSad } from "react-icons/bi";
import { BsEmojiExpressionless, BsEmojiSmile } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import FormatIcons from "../formatIcons/FormatIcons";
import Image from "../Image/Image";
import Link from "next/link";

type props = {
  data: AnimeListItem;
  index?: number;
};
export default function CarouselItem({ data, index }: props) {

  return (
    <div
      className="w-full relative h-[50vh] flex isolate items-end justify-end flex-col text-white rounded-md overflow-hidden"
    >
      <Image
        alt="image of carousel"
        src={data?.coverImage.cover_image}
        width={700}
        height={700}
        className={clsx(
          "size-full object-cover -z-10 brightness-[.3] object-center inset-0 absolute duration-500",
        )}
      />
      {/* upper info context */}
      <div className="w-full flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent px-2 pb-5 pt-1 absolute top-0 left-0">
        <div className="w-fit">
          <Chip
            icon={
              <FormatIcons
                props={{
                  style: {
                    color: data.coverImage.cover_image_color,
                  },
                }}
                format={data.format}
              />
            }
            className="!text-white !text-lg !font-bold !bg-transparent"
            label={data.format}
          />
          <Chip
            icon={
              data.averageScore ? (
                data.averageScore >= 70 ? (
                  <BsEmojiSmile className="!text-green-500" />
                ) : data.averageScore >= 50 ? (
                  <BsEmojiExpressionless className="!text-orange-500" />
                ) : (
                  <BiSad className="!text-red-500" />
                )
              ) : (
                <BiSad className="!text-red-500" />
              )
            }
            className="!text-white !text-lg !font-bold !bg-transparent"
            label={data.averageScore ? data.averageScore + "%" : 0 + "%"}
          />
        </div>

        {index && (
          <Chip
            icon={<FaHashtag className="!text-white" />}
            className="!text-white !text-lg !font-bold !bg-base-black/50"
            label={index}
          />
        )}
      </div>
      {/* lower info context */}
      <div className="w-full flex flex-col gap-2 bg-gradient-to-t from-black/50 to-transparent px-2 pb-2 pt-5">
        <Typography
          variant="body1"
          component="p"
          className="!text-sm sm:!text-xl !font-bold !border-l-4 !p-2 !relative isolate !flex !flex-col !gap-2 !w-full overflow-hidden rounded-r-md"
          style={{
            borderLeftColor: data.coverImage.cover_image_color,
          }}
        >
          {data.title}
          <span
            className="block absolute size-full inset-0 -z-10 opacity-30"
            style={{
              backgroundColor: data.coverImage.cover_image_color,
              backdropFilter: " blur(100px)",
            }}
          ></span>
          <Typography
            variant="body1"
            component="strong"
            className="!text-sm !block sm:!text-xl !font-bold !text-gray-300 !border-t-4 !pt-2 before:content-['AKA:_'] before:!text-white"
            style={{
              borderTopColor: data.coverImage.cover_image_color,
            }}
          >
            {data.title}
          </Typography>
        </Typography>


        <Chip
          className="!w-fit !text-white !text-sm !font-bold !bg-base-black/50"
          label={
            <span className="flex items-center justify-start gap-2">
              {data.episodes && (
                <>
                  EPS <i className="not-italic">&bull;</i>{" "}
                  <i className="not-italic border-r-2 border-r-white pr-2">
                    {data.episodes}
                  </i>
                </>
              )}
              <i className="not-italic">{data.status}</i>
            </span>
          }
        />

        <div className="w-full flex gap-2">
          
          <Link href={`/anime/${data.id}/watch`}>
          <Button variant="contained" startIcon={<BiPlayCircle />}>
          Play now
          </Button>
            
            </Link>
          <IconButton className="!relative !isolate !overflow-hidden invert">
            <span
              className="block absolute size-full inset-0 -z-10 invert"
              style={{
                backgroundColor: data.coverImage.cover_image_color,
                backdropFilter: " blur(100px)",
              }}
            ></span>
            <BiPlus />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
