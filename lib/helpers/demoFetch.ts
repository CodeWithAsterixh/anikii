import { anikiiApi } from "../mods/requests/axios";

export async function demoFetch(endpoint: string) {
  const res = await anikiiApi(endpoint);

  console.log(res.data);
}
