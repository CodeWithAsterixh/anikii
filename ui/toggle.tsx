"use client"

import { toggle } from '@/mods/toggle'
import clsx from 'clsx'
import React, { ReactNode, useEffect, useState } from 'react'

interface OnChange {
    (value?: any): void
}

type Props = {
    onchange?: OnChange,
    icon?: ReactNode,
    iconClass?: string,
    className?: string,
}

function Toggle({ onchange, icon, className, iconClass }: Props) {

    const [toggled, setToggled] = useState<boolean>(false)

    useEffect(() => {
        // Call the onchange callback with the toggled state when it changes
        if (onchange) {
            onchange(toggled)
        }
    }, [toggled, onchange]) // include onchange in dependency array in case it changes dynamically

    return (
        <button
            className={
                clsx(
                    "theme-fade-reverse rounded-xl w-fit h-fit p-[2px]  flex items-center duration-200 relative box-border",
                    {
                        "justify-end pl-4": toggled,
                        "justify-start pr-4": !toggled,
                    },
                    className?className:""
                )
            }
            onClick={() => setToggled(toggle(toggled))}
        >
            <span
                className={
                    clsx(
                        "size-4 rounded-full theme-fade m-0 duration-200",
                        {
                            "size-fit text-2xl":icon,
                            "ml-3 -rotate-0": toggled,
                            "mr-3 rotate-180": !toggled,
                        },
                        iconClass?iconClass:""
                    )
                }
            >{icon?icon:""}</span>
        </button>
    )
}

export default Toggle
