import { String, Number, Boolean, Record, Array, Optional, Static, Null } from "runtypes";

const LemmyInstanceUptime = Record({
  domain: String,
  latency: Number,
  countryname: Optional(String.Or(Null)),
  uptime_alltime: String,
  date_created: String,
  date_updated: Optional(String.Or(Null)),

  date_laststats: String,
  score: Number,
  status: Number,
});

const LemmyInstanceUserCounts = Record({
  total: Number,
  activeHalfyear: Number,
  activeMonth: Number,
});

const LemmyInstanceUsage = Record({
  users: LemmyInstanceUserCounts,
  localPosts: Number,
  localComments: Number,
});

const LemmyInstanceCounts = Record({
  users: Number,
  posts: Number,
  comments: Number,
  communities: Number,
  users_active_day: Number,
  users_active_week: Number,
  users_active_month: Number,
  users_active_half_year: Number,
});

const LemmyInstanceMetrics = Record({
  usersTotal: Number,
  usersMonth: Number,

  usersWeek: Number,
  totalActivity: Number,
  localPosts: Number,
  localComments: Number,
  averageUsers: Number,
  biggestJump: Number,

  averagePerMinute: Number,
  userActivityScore: Number,
  activityUserScore: Number,
  userActiveMonthScore: Number,
});

const LemmyInstanceTrust = Record({
  baseurl: String,
  metrics: LemmyInstanceMetrics,
  users: Number,
  name: String,
  base: String,
  actor_id: String,
  tags: Array(String),
  guarantor: Optional(String.Or(Null)),
  score: Number,
  reasons: Array(String),
});

const LemmyInstanceBlockCounts = Record({
  incoming: Number,
  outgoing: Number,
});

// A TypeScript interface that reflects a lemmy instance with the following JSON data
export const LemmyInstanceDataRecord = Record({
  //type: Literal("asteroid"),
  baseurl: String,
  url: String,
  name: String,
  desc: String,
  downvotes: Optional(Boolean),
  nsfw: Optional(Boolean),
  create_admin: Optional(Boolean),
  private: Optional(Boolean),
  fed: Optional(Boolean),
  date: String,
  version: String,
  open: Boolean,
  langs: Array(String),
  time: Number,
  score: Number,
  isSuspicious: Boolean,
  tags: Array(String),
  susReason: Array(String),

  usage: LemmyInstanceUsage,
  counts: LemmyInstanceCounts,
  uptime: Optional(LemmyInstanceUptime),
  metrics: LemmyInstanceMetrics,
  trust: LemmyInstanceTrust,
  blocks: LemmyInstanceBlockCounts,
});

export type LemmyInstanceData = Static<typeof LemmyInstanceDataRecord>;
