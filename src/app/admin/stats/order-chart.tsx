"use client";

import { useEffect, useState, useTransition } from "react";
import { getOrderStats } from "./actions";

type DataPoint = {
  label: string;
  count: number;
  revenue: number;
};

type Period = "week" | "month" | "year";

export function OrderChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [period, setPeriod] = useState<Period>("month");
  const [isPending, startTransition] = useTransition();
  const [showRevenue, setShowRevenue] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const stats = await getOrderStats(period);
      setData(stats);
    });
  }, [period]);

  const maxValue = Math.max(...data.map((d) => (showRevenue ? d.revenue : d.count)), 1);
  const chartHeight = 200;
  const barWidth = 100 / Math.max(data.length, 1);

  const totalOrders = data.reduce((sum, d) => sum + d.count, 0);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Ordrar</h2>
          <p className="text-sm text-zinc-500">
            {totalOrders} ordrar • {totalRevenue.toLocaleString("sv-SE")} kr
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 p-1 bg-zinc-100 rounded-md">
            {(["week", "month", "year"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  period === p
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {p === "week" ? "Vecka" : p === "month" ? "Månad" : "År"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowRevenue(!showRevenue)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              showRevenue
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            {showRevenue ? "Visar: kr" : "Visar: antal"}
          </button>
        </div>
      </div>

      {isPending ? (
        <div className="h-[250px] flex items-center justify-center text-zinc-400">Laddar...</div>
      ) : data.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-zinc-400">
          Ingen data ännu
        </div>
      ) : (
        <div className="relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-[200px] flex flex-col justify-between text-xs text-zinc-400 -ml-2 pr-2">
            <span>{showRevenue ? `${(maxValue / 1000).toFixed(0)}k` : maxValue}</span>
            <span>
              {showRevenue ? `${(maxValue / 2000).toFixed(0)}k` : Math.round(maxValue / 2)}
            </span>
            <span>0</span>
          </div>

          {/* Chart */}
          <div className="ml-8">
            <svg
              viewBox={`0 0 100 ${chartHeight}`}
              className="w-full h-[200px]"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              <line x1="0" y1="0" x2="100" y2="0" stroke="#e4e4e7" strokeWidth="0.5" />
              <line
                x1="0"
                y1={chartHeight / 2}
                x2="100"
                y2={chartHeight / 2}
                stroke="#e4e4e7"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1={chartHeight}
                x2="100"
                y2={chartHeight}
                stroke="#e4e4e7"
                strokeWidth="0.5"
              />

              {/* Bars */}
              {data.map((d, i) => {
                const value = showRevenue ? d.revenue : d.count;
                const barHeight = (value / maxValue) * chartHeight;
                const x = i * barWidth + barWidth * 0.15;
                const width = barWidth * 0.7;

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <rect
                      x={x}
                      y={chartHeight - barHeight}
                      width={width}
                      height={barHeight}
                      fill="#d4af37"
                      className="hover:fill-yellow-500 transition-colors cursor-pointer"
                    />
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2">
              {data.map((d, i) => (
                <div
                  key={i}
                  className="text-xs text-zinc-500 text-center"
                  style={{ width: `${barWidth}%` }}
                >
                  {d.label}
                </div>
              ))}
            </div>

            {/* Tooltip */}
            {hoveredBar !== null && data[hoveredBar] && (
              <div
                className="absolute bg-zinc-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
                style={{
                  left: `${(hoveredBar + 0.5) * barWidth}%`,
                  top: "-10px",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="font-semibold">{data[hoveredBar].label}</div>
                <div>{data[hoveredBar].count} ordrar</div>
                <div>{data[hoveredBar].revenue.toLocaleString("sv-SE")} kr</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
