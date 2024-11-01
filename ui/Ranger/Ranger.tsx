"use client";

import clsx from "clsx";
import { RangeSlider } from "flowbite-react";
import React, { useEffect, useState } from "react";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: number;
}

function Ranger({ onChange, value }: Props) {
  const [rangeValue, setRangeValue] = useState(0);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRangeValue(parseInt(event.target.value));
    if (onChange) {
      onChange(event);
    }
  }

  useEffect(() => {
    if (value) {
      setRangeValue(value);
    }
  }, [value]);

  return (
    <div
      className={clsx(
        "w-full h-fit flex items-center justify-center relative isolate"
      )}
    >
      <span
        className={clsx(
          "block",
          "content-[''] absolute top-1/2 -translate-y-1/2 left-1",
          "bg-primary h-2 -z-[1] rounded-l-full"
        )}
        style={{
          width: `calc(${rangeValue}% ${rangeValue > 98 ? " - 1rem" : ""})`,
        }}
      />
      <RangeSlider
        value={value ? value : rangeValue}
        onChange={(e) => handleChange(e)}
        className="relative w-full *:*:!bg-transparent"
      />
      <span
        className={clsx(
          "block",
          "content-[''] absolute top-1/2 -translate-y-1/2 right-1",
          "bg-gray-400 h-2 -z-[1] rounded-r-full"
        )}
        style={{
          width: `calc(${100 - rangeValue}%  ${
            rangeValue < 25 ? " - 1rem" : ""
          })`,
        }}
      />
    </div>
  );
}

export default Ranger;
