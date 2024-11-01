import clsx from "clsx";

interface glassMorphism {
    className?: string;
    classNameImportant?: string;

    dark?: string;
    darkImportant?: string;

    

}



const glassGeneral = "backdrop-blur-lg shadow-lg "
const glassGeneralImportant = "!backdrop-blur-lg !shadow-lg "

export const glassMorphism:glassMorphism = {
    className: glassGeneral + "bg-base-white/30 border-base-white/30",
    classNameImportant: glassGeneralImportant + "!bg-base-white/30 !border-base-white/30",
    dark: glassGeneral + "dark:bg-base-black/30 dark:border-base-black/30",
    darkImportant: glassGeneralImportant + "dark:!bg-base-black/30 dark:!border-base-black/30",
}



interface headerNavItem {
    className?: string
}
export const headerNavItem:headerNavItem = {
    className: glassGeneral + clsx(
        glassMorphism.className,
        "w-fit px-2 py-1 rounded-xl"
    ),
}