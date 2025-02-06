"use client";
import { Container } from "@mui/material";
import clsx from "clsx";


type Props = {
  children?: React.ReactNode;
  className?:string;
};

export default function AnimeGrid({ className,children }: Props) {
  return (
    <Container className={clsx(
      "!w-full !p-0 !shadow-none grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-3",
      className
    )}>
      {children}
    </Container>
  );
}
