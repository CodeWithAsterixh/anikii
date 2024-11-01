import clsx from "clsx";
import React, { Fragment } from "react";

interface eventObj extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  repeatedIndex: number;
}
interface classNameLimit {
  index?: number;
  className?: string;
}
interface classNameSpecific {
  index?: number;
  className?: string;
}

type Props = {
  n?: number;
  children?: React.ReactNode;
  onClick?: (event?: eventObj) => void;
  onMouseEnter?: (event?: eventObj) => void;
  className?: string;
  classNameLimit?: classNameLimit;
  classNameSpecific?: classNameSpecific;
  contained?: boolean;
};

function Repeater({
  n = 1,
  className,
  classNameLimit,
  classNameSpecific,
  children,
  onClick,
  onMouseEnter,
  contained = true,
}: Props) {
  return [...Array(n).keys()].map(
    (i) =>
      children &&
      (contained ? (
        <div
          className={clsx(
            className,
            classNameLimit && classNameLimit.index && i < classNameLimit.index
              ? classNameLimit.className
              : "",
            classNameSpecific &&
              classNameSpecific.index &&
              i == classNameSpecific.index - 1
              ? classNameSpecific.className
              : ""
          )}
          onClick={
            onClick
              ? (event) => onClick({ ...event, repeatedIndex: i })
              : onClick
          }
          onMouseEnter={
            onMouseEnter
              ? (event) => onMouseEnter({ ...event, repeatedIndex: i })
              : onMouseEnter
          }
          key={i}
        >
          {children}
        </div>
      ) : (
        <Fragment key={i}>{children}</Fragment>
      ))
  );
}

export default Repeater;
