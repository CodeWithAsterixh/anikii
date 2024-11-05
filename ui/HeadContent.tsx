import Head from "next/head";

type propH = {
  title?: string;
  description?: string;
  url?: string;
};
export function HeadContent({ title, description, url }: propH) {
  return (
    <Head>
      <title>title </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "My Favorite Anime",
          description: "Watch My Favorite Anime on Anikii.",
          thumbnailUrl: "url_to_thumbnail",
          uploadDate: "2024-11-05",
          duration: "PT1H30M",
          contentUrl: "url_to_video",
          embedUrl: "url_to_embed_video",
        })}
      </script>
    </Head>
  );
}

type propHWI = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};
export function HeadContentWithImage({
  description,
  title,
  url,
  image,
}: propHWI) {
  return (
    <Head>
      <title>{title} </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="og:url" content={url} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          name: title,
          description: description,
          thumbnailUrl: image,
          contentUrl: `www.anikii.vercel.app/api/images/${image}`,
          embedUrl: `/api/images/${image}`,
        })}
      </script>
    </Head>
  );
}
