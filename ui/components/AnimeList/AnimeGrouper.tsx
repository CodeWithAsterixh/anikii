import { Container, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  header?: {
    loaded?: string;
    loading?: string;
    error?: string;
  };
  link?: {
    url: Url;
    label?: string;
  };
  sxClasses?: {
    containerClass?: string;
    navContainerClass?: string;
    headingClass?: string;
    LinkClass?: string;
  };
};

export default function AnimeGrouper({
  children,
  header,
  link,
  sxClasses,
}: Props) {
  return (
    <Container
      component="section"
      className={clsx(
        "!w-full !shadow-none !flex !flex-col !gap-2 last:!mb-16 !box-border",
        sxClasses?.containerClass
      )}
    >
      <nav
        className={clsx(
          "w-full h-fit p-2 flex items-center",
          {
            "justify-between": link,
            "justify-start": !link,
          },
          sxClasses?.navContainerClass
        )}
      >
        <Typography
          variant="h6"
          component="h3"
          className={clsx(
            "!text-black dark:!text-white",
            sxClasses?.headingClass
          )}
        >
          {header?.loaded || header?.loading || header?.error}
        </Typography>
        {!(header?.error || header?.loading) && link && (
          <Link
            className={clsx(
              "!text-neutral-700 dark:!text-neutral-300",
              sxClasses?.LinkClass
            )}
            href={link.url}
            download
          >
            {link.label ? link.label : link.url.toString()}
          </Link>
        )}
      </nav>

      {children}
    </Container>
  );
}
