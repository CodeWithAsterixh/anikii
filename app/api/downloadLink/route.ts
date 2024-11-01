import axios from "axios";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url");
  const download = await axios.get(decodeURI(url ? url : ""), {
    responseType: "blob",
  });

  return new Response(download.data, {
    status: 200,
  });
}
