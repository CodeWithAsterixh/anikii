import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "image url is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`failed to fetch image: ${response.status}`);
    }

    const imageBuffer = response.data;

    const headers = new Headers();

    headers.set("Content-type", "application/octet-stream");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return new NextResponse(Buffer.from(imageBuffer), {
      headers,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
