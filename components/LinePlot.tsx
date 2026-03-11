"use client"

import * as d3 from "d3";
import { useRef, useEffect } from "react";
import type { LinePlotProps } from "@/types";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}: LinePlotProps) {

  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);

  const x = d3.scaleLinear(
    [0, Math.max(0, data.length - 1)],
    [marginLeft, width - marginRight]
  );
  const [minY, maxY] = d3.extent(data);
  const y = d3.scaleLinear([minY ?? 0, maxY ?? 0], [height - marginBottom, marginTop]);
  
  const line = d3.line<number>()
    .x((_, i) => x(i))
    .y((d) => y(d));

  useEffect(() => {
    if (gx.current) {
      d3.select(gx.current).call(d3.axisBottom(x));
    }
  }, [x]);

  useEffect(() => {
    if (gy.current) {
      d3.select(gy.current).call(d3.axisLeft(y));
    }
  }, [y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data) ?? undefined}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
