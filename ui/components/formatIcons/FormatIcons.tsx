import { mediaFormat } from "@/lib/types/anime/__releases";
import React from "react";
import {
  BiBookAlt,
  BiBullseye,
  BiMovie,
  BiMusic,
  BiSolidBookmarkAlt,
} from "react-icons/bi";
import { BsPlayCircleFill, BsStar } from "react-icons/bs";
import { FaFilm, FaTv } from "react-icons/fa";
import { GoVideo } from "react-icons/go";

type Props = {
  format: mediaFormat;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
};

export default function FormatIcons({ format, props }: Props) {
  const formatIcons = {
    TV: <FaTv />, // TV icon
    TV_SHORT: <GoVideo />, // Short TV format
    MOVIE: <BiMovie />, // Movie icon
    SPECIAL: <BsStar />, // Special content
    OVA: <FaFilm />, // OVA (Anime icon related to film/reel)
    ONA: <BsPlayCircleFill />, // ONA (Online content, play circle)
    MUSIC: <BiMusic />, // Music icon
    MANGA: <BiSolidBookmarkAlt />, // Manga (Bookmark for comics/books)
    NOVEL: <BiBookAlt />, // Novel (Book icon)
    ONE_SHOT: <BiBullseye />, // One-shot (Single aim/bullseye)
  };
  return <i {...props}>{formatIcons[format]}</i>;
}
