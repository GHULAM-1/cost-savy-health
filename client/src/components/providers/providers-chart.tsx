"use client";

import React from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { maxPrice, minPrice, priceData } from "@/data/graph/price-data";

interface PriceDistributionChartProps{
  midpointPrice:number;
}
export function PriceDistributionChart({midpointPrice}:PriceDistributionChartProps) {
  
  const chartConfig = {
    value: {
      label: "Frequency",
      color: "#03363D",
    },
  } satisfies ChartConfig;

  const customTickFormatter = (value: any) => {
    if (value === minPrice) return "min.";
    if (value === maxPrice) return "max.";
    if (value === Math.round((minPrice + maxPrice) / 2)) return "Price";
    return "";
  };
  const CustomTick = (props: any) => {
    const { x, y, payload } = props;
    const value = payload.value;
  
    if (
      value !== minPrice &&
      value !== maxPrice &&
      value !== Math.round((minPrice + maxPrice) / 2)
    ) {
      return null;
    }
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="middle"
          fill="#6B7280"
          fontSize={12}
        >
          {customTickFormatter(value)}
        </text>
        {value === minPrice && (
          <text
            x={0}
            y={15}
            dy={13}
            textAnchor="middle"
            style={{fill: "#000000", fontSize: "16px", fontWeight: 500}}
          >
            ${minPrice.toLocaleString()}
          </text>
        )}
        {value === maxPrice && (
          <text
            x={-8}
            y={15}
            dy={13}
            textAnchor="middle"
            style={{fill: "#000000", fontSize: "16px", fontWeight: 500}}
          >
            ${maxPrice.toLocaleString()}
          </text>
        )}
      </g>
    );
  };

  return (
    <Card className="w-full border-0 outline-0 px-0 pt-3 pb-0 shadow-none">
      <CardContent className="relative px-0 pt-8">
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#03363D] text-white py-1 px-2 rounded-sm font-medium text-sm">
          ${midpointPrice.toLocaleString()}
        </div>
        <div className="h-52">
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={priceData}
              margin={{ top: 5, right: 10, left: 10, bottom: 40 }}
            >
              <defs>
                <linearGradient id="colorFrequency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6fd6ce" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <YAxis
                type="number"
                domain={[0, "dataMax"]}
                axisLine={true}
                tickLine={false}
                tick={false}
                label={{
                  value: "Frequency",
                  angle: -90,
                  style: { fill: "#6B7280", fontSize: 16 },
                }}
              />

              <XAxis
                dataKey="price"
                axisLine={true}
                tickLine={false}
                label={{
                  value: "Price",
                  position: "bottom",
                  offset: -18,
                  style: { fill: "#6B7280", fontSize: 16 },
                }}
                ticks={[
                  minPrice,
                  Math.round((minPrice + maxPrice) / 2),
                  maxPrice,
                ]}
                tick={<CustomTick />}
                domain={[minPrice, maxPrice]}
              />

              <ReferenceLine
                x={midpointPrice}
                stroke="#03363D"
                strokeDasharray="3 3"
                strokeWidth={2}
              />

              <Area
                type="natural"
                dataKey="value"
                stroke="#03363D"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFrequency)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
