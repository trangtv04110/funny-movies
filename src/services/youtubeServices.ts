import { GOOGLE_API_KEY } from "@/configs";

export const getContent = async (id: string) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${GOOGLE_API_KEY}&part=snippet`;
  const res = await fetch(url);
  const data = await res.json();

  if (data && data.items && data.items[0]) {
    return data.items[0].snippet;
  }
  return null;
};
