import { z } from "zod";

export const ApiStatusSchema = z.object({
  code: z.number(),
  success: z.boolean(),
  message: z.string(),
});

export const ApiRequestInfoSchema = z.object({
  id: z.string().optional(),
  timestamp: z.string().optional(),
  method: z.string().optional(),
  path: z.string().optional(),
  query: z.record(z.string(), z.unknown()).optional(),
});

export const AnimeTitleSchema = z.object({
  romaji: z.string().optional(),
  english: z.string().optional(),
  native: z.string().optional(),
});

export const CoverImageSchema = z.object({
  cover_image_color: z.string().optional(),
  cover_image: z.string().optional(),
  bannerImage: z.string().optional(),
});

export const SeasonSchema = z.object({
  type: z.string().optional(),
  year: z.number().optional(),
});

export const AnimeSchema = z.object({
  id: z.number(),
  title: z.union([z.string(), AnimeTitleSchema]),
  episodes: z.number().catch(0),
  status: z.string().optional().catch("Unknown"),
  coverImage: CoverImageSchema.optional().catch({}),
  format: z.string().optional().catch("N/A"),
  popularity: z.number().optional().catch(0),
  averageScore: z.number().optional().catch(0),
  trending: z.number().optional().catch(0),
  releaseDate: z.union([z.number(), z.string()]).optional().catch(""),
});

export const AnimeDetailsSchema = AnimeSchema.extend({
  title: AnimeTitleSchema, // In details it's always an object
  description: z.string().optional().catch("No description available."),
  genres: z.array(z.string()).optional().catch([]),
  studios: z.array(z.string()).optional().catch([]),
  duration: z.number().optional().catch(0),
  season: SeasonSchema.optional().catch({}),
  type: z.string().optional().catch("TV"),
  trailer: z.object({
    id: z.string().optional(),
    site: z.string().optional(),
    thumbnail: z.string().optional(),
  }).optional().catch({}),
  tags: z.array(z.string()).optional().catch([]),
  nextAiringEpisode: z.object({
    airingAt: z.number(),
    timeUntilAiring: z.number(),
    episode: z.number(),
  }).nullable().optional().catch(null),
});

export function createApiEnvelopeSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    status: ApiStatusSchema,
    request: ApiRequestInfoSchema.optional(),
    meta: z.record(z.string(), z.any()).optional(),
    data: dataSchema,
  });
}

export const AnimeListEnvelopeSchema = createApiEnvelopeSchema(z.array(AnimeSchema));
export const AnimeDetailsEnvelopeSchema = createApiEnvelopeSchema(AnimeDetailsSchema);

export const StreamLinkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const EpisodeInfoSchema = z.object({
  title: z.string().optional().catch(""),
  thumbnail: z.string().optional().catch(""),
  episodes: z.object({
    currentEpisode: z.number().catch(0),
    lastEpisode: z.number().catch(0),
  }).optional(),
});

export const EpisodeExtraSchema = z.object({
  episodesSub: z.any().optional(),
  episodesDub: z.any().optional(),
  animeInfo: EpisodeInfoSchema.optional(),
  meta: z.object({
    episode: z.number().catch(0),
    hasSub: z.boolean().catch(false),
    hasDub: z.boolean().catch(false),
  }).optional(),
});

export const StreamMetadataSchema = z.object({
  id: z.number(),
  streamingEpisodes: z.array(z.object({
    title: z.string(),
    thumbnail: z.string().optional().catch(""),
    url: z.string().url(),
    site: z.string().optional().catch("Unknown"),
  })).optional().catch([]),
});

export const StreamMetadataEnvelopeSchema = createApiEnvelopeSchema(StreamMetadataSchema);
export const EpisodeExtraEnvelopeSchema = createApiEnvelopeSchema(EpisodeExtraSchema);
