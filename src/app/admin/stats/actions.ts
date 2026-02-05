"use server";

import { db } from "@/db";
import { sql } from "drizzle-orm";

type Period = "week" | "month" | "year";

export async function getOrderStats(period: Period = "month") {
  let groupBy: string;

  switch (period) {
    case "week":
      groupBy = "TO_CHAR(created_at, 'IYYY-IW')";
      break;
    case "year":
      groupBy = "TO_CHAR(created_at, 'YYYY')";
      break;
    case "month":
    default:
      groupBy = "TO_CHAR(created_at, 'YYYY-MM')";
      break;
  }

  const result = await db.execute(
    sql.raw(`
    SELECT 
      ${groupBy} as period,
      COUNT(*) as count,
      COALESCE(SUM(total), 0) as revenue
    FROM orders
    WHERE created_at IS NOT NULL
    GROUP BY ${groupBy}
    ORDER BY ${groupBy} DESC
    LIMIT ${period === "year" ? 5 : 12}
  `),
  );

  const data = (result.rows as Array<{ period: string; count: string; revenue: string }>)
    .reverse()
    .map((row) => {
      let label = row.period;

      if (period === "week") {
        const weekNum = row.period.split("-")[1];
        label = `V${parseInt(weekNum)}`;
      } else if (period === "month") {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Maj",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Okt",
          "Nov",
          "Dec",
        ];
        const monthNum = parseInt(row.period.split("-")[1]) - 1;
        label = months[monthNum];
      }

      return {
        label,
        count: parseInt(row.count),
        revenue: Math.round(parseFloat(row.revenue)),
      };
    });

  return data;
}
