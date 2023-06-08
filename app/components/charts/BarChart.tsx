import useMeasure from "react-use-measure";
import * as d3 from "d3";
import { Category, TransactionResponse } from "@/types";
import { motion } from "framer-motion";
import { barChartConfig } from "@/app/constants/barChartConfig";
import useGetGroupedData from "@/hooks/useGetGroupedData";
import { useFilterStore } from "@/store/filter-store";

export default function BarChart({
  transactions,
  categories,
}: {
  transactions: TransactionResponse[];
  categories: Category[];
}) {
  let [ref, bounds] = useMeasure();
  const { currentPeriod } = useFilterStore();
  const groupedData = useGetGroupedData(transactions, categories);

  const width = bounds.width;
  const { height, marginTop, marginBottom, marginLeft, marginRight } =
    barChartConfig;

  const xScale = d3
    .scaleBand()
    .domain(groupedData.map((d) => d.categoryId as string))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const maxValue = d3.max(groupedData, (e) => e.transactions.amount);
  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue || 0])
    .range([height - marginBottom, marginTop]);

  return (
    <div ref={ref} className="bar-chart">
      <svg
        id="chartSvg"
        width={bounds.width}
        height={height + 20}
        viewBox={`0 0 ${bounds.width} ${height}`}
      >
        {groupedData.map((data, i) => (
          <g
            key={i}
            transform={`translate(${xScale(data.categoryId)},0)`}
            style={{ fontSize: "20px" }}
          >
            <text
              x={xScale.bandwidth() / 4}
              y={height - 5}
              textAnchor="middle"
              fill="#f59e0b"
            >
              {data.categoryId}
            </text>
          </g>
        ))}

        {yScale.ticks(5).map((max) => (
          <g
            transform={`translate(0,${yScale(max)})`}
            style={{ color: "#f59e0b", fontSize: "22px" }}
            key={max}
          >
            <line
              x1={marginLeft}
              x2={width - marginRight}
              stroke="white"
              strokeDasharray="1,3"
            />
            <text alignmentBaseline="middle" fill="currentColor">
              {max}
            </text>
          </g>
        ))}

        <g>
          {groupedData.map((data, i) => (
            <motion.g
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
            >
              <motion.rect
                rx="20"
                x={xScale(data.categoryId)}
                y={yScale(data.transactions.amount as number)}
                height={yScale(0) - yScale(data.transactions.amount as number)}
                width={xScale.bandwidth() / 2}
                fill={data.chartColor}
              />
            </motion.g>
          ))}
        </g>

        <text
          x={width / 2}
          y={yScale(maxValue as number) - 20 || height}
          fill="white"
        >
          {currentPeriod}
        </text>
      </svg>
    </div>
  );
}
