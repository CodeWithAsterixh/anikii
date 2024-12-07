// app/api/details/[id]/route.ts
import { __BASE_URL__ } from "@/lib/constants/baseurl";
import { fetchData } from "@/lib/helpers/fetchHelpers";
import { parser } from "@/lib/helpers/parsingHelpers";
import { StreamInfo } from "@/lib/types/__anikii_api";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const param = await params;

  try {
    const url = `${__BASE_URL__}${param.id}`;
    const html = await fetchData(url);
    const result: StreamInfo = parser.streamingInfo(html);
    const findMp4 = result.streamLink?.find((x) => x["mp4upload"]);
    const mp4upload = findMp4 ? findMp4["mp4upload"] : undefined;
    let videoSrc = "not available";
    if (mp4upload) {
      const html = await fetchData(mp4upload);
      videoSrc = parser.downloadLink(html);
    }
    result.downloadSrc = videoSrc;

    if (!result) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
