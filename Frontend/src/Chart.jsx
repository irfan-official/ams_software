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

const data = [
  { day: "Mon", "irfans.dev": 10, "github-link": 5, "my-blog": 2 },
  { day: "Tue", "irfans.dev": 20, "github-link": 8, "my-blog": 4 },
  { day: "Wed", "irfans.dev": 15, "github-link": 6, "my-blog": 10 },
  { day: "Thu", "irfans.dev": 25, "github-link": 10, "my-blog": 6 },
  { day: "Fri", "irfans.dev": 18, "github-link": 12, "my-blog": 7 },
  { day: "Sat", "irfans.dev": 22, "github-link": 15, "my-blog": 5 },
  { day: "Sun", "irfans.dev": 30, "github-link": 20, "my-blog": 10 },

  { day: "Mon", "irfans.dev": 10, "github-link": 5, "my-blog": 2 },
  { day: "Tue", "irfans.dev": 20, "github-link": 8, "my-blog": 4 },
  { day: "Wed", "irfans.dev": 15, "github-link": 6, "my-blog": 10 },
  { day: "Thu", "irfans.dev": 25, "github-link": 10, "my-blog": 6 },
  { day: "Fri", "irfans.dev": 18, "github-link": 12, "my-blog": 7 },
  { day: "Sat", "irfans.dev": 22, "github-link": 15, "my-blog": 5 },
  { day: "Sun", "irfans.dev": 30, "github-link": 20, "my-blog": 10 },
];

const links = ["irfans.dev", "github-link", "my-blog"];

// const randomColor = require("randomcolor");

function getNonBlackColor() {
  let color;
  do {
    color = randomColor();
  } while (color.toLowerCase() === "#000000");
  return color;
}

const colors = [getNonBlackColor(), getNonBlackColor(), getNonBlackColor()];

export default function Chart() {
  const [focusedLink, setFocusedLink] = useState(null);

  const handleLegendClick = (e) => {
    setFocusedLink((prev) => (prev === e.value ? null : e.value));
  };

  return (
    <div
      className="bg-black text-white rounded-xl shadow-md p-6  w-full h-screen flex justify-center
     items-center"
    >
      <div className="w-[50%]">
        <div className="mb-4 flex items-center justify-between ">
          <div>
            <h2 className="text-lg font-semibold">Link Visit Statistics</h2>
            <p className="text-sm text-gray-400">
              Daily visit counts for your shortened links.
            </p>
          </div>
          <button
            onClick={() => setFocusedLink(null)}
            className="text-sm px-3 py-1 rounded bg-white text-black hover:bg-gray-200"
          >
            All Mode
          </button>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#888" />
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
