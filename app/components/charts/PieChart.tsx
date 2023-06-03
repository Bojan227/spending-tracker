import useMeasure from "react-use-measure";
import { barChartConfig } from "@/app/constants/barChartConfig";
import * as d3 from "d3";
import useGetGroupedData from "@/hooks/useGetGroupedData";
import { Category, TransactionResponse } from "@/types";
import { useEffect, useRef } from "react";
import { useFilterStore } from "@/store/filter-store";

interface DataItem {
  label: string;
  chartColor: string;
  amount: number;
}

function calculateCentroid(arc: any) {
  return function (d: any) {
    const centroid = arc.centroid(d);
    return [centroid[0], centroid[1]];
  };
}

export default function PieChart({
  categories,
  transactions,
}: {
  categories: Category[];
  transactions: TransactionResponse[];
}) {
  const groupedData = useGetGroupedData(transactions, categories);
  const { currentPeriod } = useFilterStore();

  const transformedData: DataItem[] = groupedData.map((transaction) => ({
    label: transaction.categoryId,
    amount: transaction.transactions.amount,
    chartColor: transaction.chartColor,
  }));

  let [ref, bounds] = useMeasure();
  const { height } = barChartConfig;

  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current && transformedData.length > 0) {
      const svg = d3.select(chartRef.current);
      const radius = Math.min(bounds.width, height) / 2;
      const colorScheme = transformedData.map((d) => d.chartColor);
      const colorScale = d3.scaleOrdinal(colorScheme);
      const pie = d3.pie<DataItem>().value((d) => d.amount);

      svg.attr("width", bounds.width).attr("height", height + 60);

      const g = svg
        .append("g")
        .attr("transform", `translate(${bounds.width / 2}, ${height / 2})`);

      const arcs = g
        .selectAll(".arc")
        .data(pie(transformedData))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", (d: any) =>
          (d3.arc() as any).innerRadius(0).outerRadius(radius)(d)
        )
        .attr("fill", (d, i) => colorScale(d.data.chartColor));

      arcs
        .append("text")
        .attr(
          "transform",
          (d) =>
            `translate(${calculateCentroid(
              d3
                .arc<DataItem, d3.DefaultArcObject>()
                .innerRadius(0)
                .outerRadius(radius)
            )(d)})`
        )
        .attr("text-anchor", "middle")
        .text((d) => d.data.label);

      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${bounds.width - 350}, 40)`);

      const legendItems = legend
        .selectAll(".legend-item")
        .data(transformedData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 40})`);

      legendItems
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (_, i) => colorScale(i.toString()));

      legendItems
        .append("text")
        .attr("x", 15)
        .attr("y", 9)
        .text((d) => `$${d.amount}`)
        .attr("fill", "white")
        .attr("font-size", "30px");
    }
  }, [groupedData]);

  return (
    <div ref={ref} className="bar-chart">
      {groupedData.length === 0 ? (
        <h1>No data for the selected period</h1>
      ) : (
        <svg ref={chartRef}>
          <text x={bounds.width / 4} y={height / 2} fill="white">
            {currentPeriod}
          </text>
        </svg>
      )}
    </div>
  );
}
