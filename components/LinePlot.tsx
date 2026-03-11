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

  /**
   * Refs pointing to the SVG <g> elements that will contain the axes.
   * D3 will directly manipulate these DOM nodes to draw axis ticks and labels.
   */
  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);

  /**
   * X SCALE
   * ----------
   * Maps the data index (0 → data.length - 1) to pixel positions inside the SVG.
   *
   * scaleLinear(domain, range)
   * domain = input values (data space)
   * range  = output values (screen/pixel space)
   *
   * We start at marginLeft so the axis doesn't overlap the edge,
   * and end at width - marginRight.
   */
  const x = d3.scaleLinear(
    [0, Math.max(0, data.length - 1)],
    [marginLeft, width - marginRight]
  );

  /**
   * Determine min and max Y values from the dataset.
   * d3.extent returns [min, max].
   */
  const [minY, maxY] = d3.extent(data);

  /**
   * Y SCALE
   * ----------
   * Maps data values to vertical pixel positions.
   *
   * IMPORTANT: SVG Y coordinates increase downward,
   * so the range is reversed to make higher values appear higher.
   */
  const y = d3.scaleLinear(
    [minY ?? 0, maxY ?? 0],
    [height - marginBottom, marginTop]
  );
  
  /**
   * LINE GENERATOR
   * ----------------
   * d3.line() converts an array of numbers into an SVG path string.
   *
   * For each data point:
   * - x position = index mapped through x scale
   * - y position = value mapped through y scale
   *
   * The result becomes the `d` attribute of the <path>.
   */
  const line = d3.line<number>()
    .x((_, i) => x(i))
    .y((d) => y(d));

  /**
   * X AXIS
   * -------
   * When the x scale changes, redraw the axis.
   *
   * d3.axisBottom(x) creates a bottom-oriented axis generator
   * using the x scale.
   *
   * .call(axis) tells D3 to render the axis into the selected <g>.
   */
  useEffect(() => {
    if (gx.current) {
      d3.select(gx.current).call(d3.axisBottom(x));
    }
  }, [x]);

  /**
   * Y AXIS
   * -------
   * Similar to the x axis but positioned vertically on the left.
   */
  useEffect(() => {
    if (gy.current) {
      d3.select(gy.current).call(d3.axisLeft(y));
    }
  }, [y]);

  return (
    <svg width={width} height={height}>

      {/* X axis group positioned at the bottom of the chart */}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />

      {/* Y axis group positioned at the left margin */}
      <g ref={gy} transform={`translate(${marginLeft},0)`} />

      {/* Main line path generated from the data */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data) ?? undefined}
      />

      {/* Render a small circle at each data point */}
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}