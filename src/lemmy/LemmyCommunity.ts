import { Record, Number, String, Boolean, Static, Optional } from "runtypes";

export const LemmyCommunityCounts = Record({
  id: Number,
  community_id: Number,
  subscribers: Number,
  posts: Number,
  comments: Number,
  published: String,
  users_active_day: Number,
  users_active_week: Number,
  users_active_month: Number,
  users_active_half_year: Number,
  hot_rank: Optional(Number), // Seems unused
});

// A TypeScript interface that reflects a lemmy commuity with the following JSON data
export const LemmyCommunityDataRecord = Record({
  baseurl: String,
  url: String,
  name: String,
  title: String,
  desc: String,
  nsfw: Boolean,
  counts: LemmyCommunityCounts,
  time: Number,
  isSuspicious: Boolean,
  score: Number,
});

export type LemmyCommunityData = Static<typeof LemmyCommunityDataRecord>;
