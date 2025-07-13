import jsonData from "./data.json" assert { type: "json" };

const data1 = [
  { day: "Mon", "irfans.dev": 10, "github-link": 5, "my-blog": 2 },
  { day: "Tue", "irfans.dev": 20, "github-link": 8, "my-blog": 4 },
  { day: "Wed", "irfans.dev": 15, "github-link": 6, "my-blog": 10 },
  { day: "Thu", "irfans.dev": 25, "github-link": 10, "my-blog": 6 },
  { day: "Fri", "irfans.dev": 18, "github-link": 12, "my-blog": 7 },
  { day: "Sat", "irfans.dev": 22, "github-link": 15, "my-blog": 5 },
  { day: "Sun", "irfans.dev": 30, "github-link": 20, "my-blog": 10 },
];

import data from "./data.json" assert { type: "json" };

function extractDomain(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return url; // fallback if malformed
  }
}

function transformData(data) {
  const grouped = {};

  for (const item of data) {
    const day = item.day;
    const domain = extractDomain(item.forwardLink);
    const count = item.visitCount;

    if (!grouped[day]) {
      grouped[day] = { day };
    }

    if (!grouped[day][domain]) {
      grouped[day][domain] = 0;
    }

    grouped[day][domain] += count;
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const result = days.map((day) => grouped[day] || { day });

  return result;
}

const transformed = transformData(data);
console.log(JSON.stringify(transformed, null, 2));
