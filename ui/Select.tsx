"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import {
  Dropdown,
  DropdownHeaderProps,
  DropdownItem,
  DropdownItemProps,
  DropdownProps,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

export interface selectables extends DropdownItemProps {
  name?: string;
  render?: React.ReactNode;
}
export interface dropDownProps extends DropdownProps {
  name?: string;
  render?: React.ReactNode;
}

type Props = {
  children?: React.ReactNode;
  selectables?: selectables[];
  className?: string;
  value?: string;
  defaultValue?: string;
  dropDownProps?: dropDownProps;
  selectedClass?: string;
  dropDownItemClass?: string;
  dropDownItemContainerClass?: string;
  dropDownItemOtherContentClass?: string;
  dropDownItemClassPicked?: string;
  animate?: boolean;
  onChange?: (change: any) => void;
};

function Select({
  selectables,
  defaultValue,
  onChange,
  className,
  selectedClass,
  value,
  children,
  dropDownProps = { label: "" },
  dropDownItemClass,
  dropDownItemContainerClass,
  dropDownItemOtherContentClass,
  dropDownItemClassPicked,
  animate = true,
}: Props) {
  const [selected, setSelected] = useState<
    string | number | readonly string[] | undefined | null
  >(null);

  useEffect(() => {
    if (onChange && selected) {
      onChange(selected);
    }
  }, [selected]);

  return (
    <div className={clsx("w-full relative", className)}>
      <Dropdown
        className="w-full p-2 relative"
        dismissOnClick={false}
        renderTrigger={() => (
          <div
            className={clsx(
              "mt-1 p-1 w-full cursor-pointer flex items-center justify-between border relative border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100",
              selectedClass
            )}
          >
            <span className="w-full flex items-center justify-start overflow-x-auto scroll-smooth">
              {selected
                ? selected
                : defaultValue && defaultValue.trim() !== ""
                ? defaultValue
                : value && value.trim() !== ""
                ? value
                : "Please select an item"}
            </span>
            <span className="w-fit shrink-0">
              <CaretDown />
            </span>
          </div>
        )}
        {...dropDownProps}
      >
        {children && (
          <li
            className={clsx("w-full relative", dropDownItemOtherContentClass)}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {children}
          </li>
        )}
        <ul
          className={clsx(
            "w-full relative max-h-[50vh] overflow-y-auto mt-2",
            dropDownItemContainerClass
          )}
        >
          {selectables?.map((selectable, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                setSelected(selectable.value);
              }}
              className={clsx(
                "rounded-md mb-2 line-clamp-1 leading-8 py-1 text-left",
                dropDownItemClassPicked
                  ? selected == selectable.value
                    ? dropDownItemClassPicked
                    : ""
                  : {
                      "bg-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700":
                        selected == selectable.value,
                    },
                dropDownItemClass
              )}
              {...selectable}
            >
              {selectable.render
                ? selectable.render
                : selectable.value
                ? selectable.value
                : ""}
            </DropdownItem>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}

export default Select;
