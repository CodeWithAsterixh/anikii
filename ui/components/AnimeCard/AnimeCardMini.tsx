import { AnimeListItem } from "@/lib/types/anime/__animeListItem"
import Link from "next/link"
import Image from "../Image/Image"

type Props = {
    data: AnimeListItem
}

export default function AnimeCardMini({data}: Props) {
  return (
    <Link href={`/anime/${data.id}`} className="w-full flex gap-2 items-center bg-primary/30 p-2 rounded-md">
            <span className="size-14 bg-tertiary rounded-md shrink-0 overflow-hidden">
              <Image src={data.coverImage.cover_image} alt={data.title} width={200} height={200} className="size-full"/>
            </span>
            {/* mini details */}
            <ul className="flex flex-col gap-2 justify-between text-tertiary w-full">
              <li className="font-bold text-sm line-clamp-1">{data.title}</li>
              <li className="text-tertiary/60 text-xs">{data.releaseDate}</li>
            </ul>
            {/* status */}
            <strong className="text-tertiary text-xs">{data.status}</strong>
          </Link>
  )
}

