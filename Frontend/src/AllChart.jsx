import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import randomColor from "randomcolor";
import { parseISO, format, getWeek, getMonth, getYear } from "date-fns";

const rawData = [
  { date: "2025-07-01", "irfans.dev": 10, "github-link": 5, "my-blog": 2 },
  { date: "2025-07-02", "irfans.dev": 20, "github-link": 8, "my-blog": 4 },
  { date: "2025-07-03", "irfans.dev": 15, "github-link": 6, "my-blog": 10 },
  { date: "2025-07-04", "irfans.dev": 25, "github-link": 10, "my-blog": 6 },
  { date: "2025-07-05", "irfans.dev": 18, "github-link": 12, "my-blog": 7 },
  { date: "2025-07-06", "irfans.dev": 22, "github-link": 15, "my-blog": 5 },
  { date: "2025-07-07", "irfans.dev": 30, "github-link": 20, "my-blog": 10 },
  { date: "2025-07-08", "irfans.dev": 27, "github-link": 17, "my-blog": 8 },
  { date: "2025-07-09", "irfans.dev": 24, "github-link": 13, "my-blog": 6 },
  { date: "2025-07-10", "irfans.dev": 20, "github-link": 10, "my-blog": 5 },
  { date: "2025-06-01", "irfans.dev": 12, "github-link": 4, "my-blog": 3 },
  { date: "2025-06-05", "irfans.dev": 15, "github-link": 6, "my-blog": 4 },
  { date: "2025-06-10", "irfans.dev": 18, "github-link": 7, "my-blog": 5 },
  { date: "2025-06-15", "irfans.dev": 22, "github-link": 7, "my-blog": 8 },
  { date: "2025-06-20", "irfans.dev": 25, "github-link": 10, "my-blog": 6 },
  { date: "2025-06-25", "irfans.dev": 20, "github-link": 9, "my-blog": 7 },
  { date: "2025-06-30", "irfans.dev": 23, "github-link": 12, "my-blog": 6 },
  { date: "2025-05-01", "irfans.dev": 10, "github-link": 4, "my-blog": 2 },
  { date: "2025-05-05", "irfans.dev": 12, "github-link": 5, "my-blog": 3 },
  { date: "2025-05-10", "irfans.dev": 14, "github-link": 6, "my-blog": 5 },
  { date: "2025-05-15", "irfans.dev": 16, "github-link": 7, "my-blog": 4 },
  { date: "2025-05-20", "irfans.dev": 19, "github-link": 8, "my-blog": 5 },
  { date: "2025-05-25", "irfans.dev": 21, "github-link": 9, "my-blog": 6 },
  { date: "2025-05-30", "irfans.dev": 23, "github-link": 11, "my-blog": 7 },
  { date: "2024-07-02", "irfans.dev": 25, "github-link": 11, "my-blog": 9 },
  { date: "2024-07-10", "irfans.dev": 18, "github-link": 9, "my-blog": 6 },
  { date: "2024-07-15", "irfans.dev": 20, "github-link": 8, "my-blog": 5 },
  { date: "2024-07-20", "irfans.dev": 22, "github-link": 10, "my-blog": 6 },
  { date: "2024-07-25", "irfans.dev": 19, "github-link": 7, "my-blog": 4 },
  { date: "2024-07-30", "irfans.dev": 21, "github-link": 9, "my-blog": 5 },
];

const links = ["irfans.dev", "github-link", "my-blog"];

function getNonBlackColor() {
  let color;
  do {
    color = randomColor();
  } while (color.toLowerCase() === "#000000");
  return color;
}
const colors = [getNonBlackColor(), getNonBlackColor(), getNonBlackColor()];

function aggregateData(data, mode) {
  const grouped = {};
  data.forEach((item) => {
    const date = parseISO(item.date);
    let key = "";
    if (mode === "day") key = format(date, "yyyy-MM-dd");
    else if (mode === "week") key = `${getYear(date)}-W${getWeek(date)}`;
    else if (mode === "month") key = format(date, "yyyy-MM");
    else if (mode === "year") key = `${getYear(date)}`;

    if (!grouped[key]) {
      grouped[key] = { label: key };
      links.forEach((link) => (grouped[key][link] = 0));
    }
    links.forEach((link) => {
      grouped[key][link] += item[link] || 0;
    });
  });

  return Object.keys(grouped)
    .sort()
    .map((key) => ({ ...grouped[key] }));
}

export default function AllChart() {
  const [focusedLink, setFocusedLink] = useState(null);
  const [mode, setMode] = useState("day");

  const aggregatedData = aggregateData(rawData, mode);

  const handleLegendClick = (e) => {
    setFocusedLink((prev) => (prev === e.value ? null : e.value));
  };

  return (
    <div className="bg-black text-white rounded-xl shadow-md p-6 w-full h-screen flex justify-center items-center">
      <div className="w-[90%] md:w-[70%] lg:w-[50%]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Link Visit Statistics</h2>
            <p className="text-sm text-gray-400">
              View visits {mode}-wise for your shortened links.
            </p>
          </div>
          <button
            onClick={() => setFocusedLink(null)}
            className="text-sm px-3 py-1 rounded bg-white text-black hover:bg-gray-200"
          >
            All Mode
          </button>
        </div>

        <div className="flex space-x-2 mb-4">
          {["day", "week", "month", "year"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`text-sm px-3 py-1 rounded ${
                mode === m ? "bg-white text-black" : "bg-gray-800 text-white"
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aggregatedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="label" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload?.length) {
                    const items = payload.filter(
                      (item) =>
                        focusedLink === null || item.dataKey === focusedLink
                    );
                    return (
                      <div className="bg-black p-2 rounded text-white text-sm shadow">
                        <p className="font-semibold">{label}</p>
                        {items.map((item, i) => (
                          <p key={i} style={{ color: item.stroke }}>
                            {item.dataKey}: {item.value}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                onClick={handleLegendClick}
                wrapperStyle={{ cursor: "pointer" }}
              />
              {links.map((linkKey, index) => (
                <Line
                  key={linkKey}
                  type="monotone"
                  dataKey={linkKey}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  opacity={
                    focusedLink === null || focusedLink === linkKey ? 1 : 0.2
                  }
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
