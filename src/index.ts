import http from "http";
import fs from "fs";
import { LemmyInstanceData, LemmyInstanceDataRecord } from "./lemmy/LemmyInstance";
import { Array } from "runtypes";
import { LemmyCommunityData, LemmyCommunityDataRecord } from "./lemmy/LemmyCommunity";
const { printTable } = require("console-table-printer");

const lemmyInstancesUrl = "https://data.lemmyverse.net/data/instance.full.json";
const lemmyCommunitiesUrl = "https://data.lemmyverse.net/data/community.full.json";

async function getInstanceData(): Promise<LemmyInstanceData[]> {
  const response = await fetch(lemmyInstancesUrl);
  const data = await response.json();
  return Array(LemmyInstanceDataRecord).check(data);
}

async function getCommunitiesData(): Promise<LemmyCommunityData[]> {
  const response = await fetch(lemmyCommunitiesUrl);
  const data = await response.json();
  return Array(LemmyCommunityDataRecord).check(data);
}

(async () => {
  try {
    const instanceData = (await getInstanceData())
      .filter((instance) => {
        return instance.score > 0;
      })
      .filter((instance) => {
        return !instance.isSuspicious;
      })
      .sort((a, b) => {
        return b.usage.users.total - a.usage.users.total;
      })
      .slice(0, 10)
      .map((instance) => {
        return {
          users: instance.usage.users.total,
          name: instance.name,
          url: instance.url,
        };
      });

    console.info("Top 10 Instances: ");
    printTable(instanceData);

    const communityDataRaw = await getCommunitiesData();
    const topTenCommunities = communityDataRaw
      .sort((a, b) => {
        return b.counts.subscribers - a.counts.subscribers;
      })
      .slice(0, 10)
      .map((community) => {
        return {
          subscribers: community.counts.subscribers,
          name: community.name,
          url: community.url,
        };
      });
    console.info("Top 10 Communities: ");
    printTable(topTenCommunities);

    const topTenNSFWCommunities = communityDataRaw
      .sort((a, b) => {
        return b.counts.subscribers - a.counts.subscribers;
      })
      .filter((community) => community.nsfw)
      .slice(0, 10)
      .map((community) => {
        return {
          subscribers: community.counts.subscribers,
          name: community.name,
          url: community.url,
        };
      });
    console.info("Top 10 NSFW Communities: ");
    printTable(topTenNSFWCommunities);

    const topTenDiscussedCommunities = communityDataRaw
      .sort((a, b) => {
        return b.counts.comments - a.counts.comments;
      })
      .slice(0, 10)
      .map((community) => {
        return {
          comments: community.counts.comments,
          subscribers: community.counts.subscribers,
          name: community.name,
          url: community.url,
        };
      });
    console.info("Top 10 Commented Communities: ");
    printTable(topTenDiscussedCommunities);
  } catch (e) {
    console.log(e);
  }
})();

function checkIfPhishing(urlToPrint) {
  const file = fs.createWriteStream("SiteObject.json");
  const request = http.get(urlToPrint, function (response) {
    response
      .on("finish", function () {
        console.log(fs.readFileSync("SiteObject.json", { encoding: "utf8" }));
      })
      .pipe(file);
  });
}
