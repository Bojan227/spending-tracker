import useMeasure from "react-use-measure";
import { barChartConfig } from "@/app/constants/barChartConfig";
import * as d3 from "d3";
import useGetGroupedData from "@/hooks/useGetGroupedData";
import { Category, TransactionResponse } from "@/types";
import { useFilterStore } from "@/store/filter-store";
import { motion } from "framer-motion";

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

  const radius = Math.min(bounds.width, height) / 2;
  const colorScheme = transformedData.map((d) => d.chartColor);
  const colorScale = d3.scaleOrdinal(colorScheme);
  const pie = d3.pie<DataItem>().value((d) => d.amount);
  const pieData = pie(transformedData);

  const legendItems = transformedData.map((data, index) => (
    <g
      key={index}
      className="legend-item"
      transform={`translate(${index * 100}, 0)`}
    >
      <rect width={10} height={10} fill={colorScale(index.toString())} />
      <text x={15} y={14} fill="white" fontSize="25px">
        ${data.amount}
      </text>
    </g>
  ));

  return (
    <div ref={ref} className="bar-chart">
      {groupedData.length === 0 ? (
        <h1>No data for the selected period</h1>
      ) : (
        <svg
          radius={Math.min(bounds.width, height) / 2}
          width={bounds.width}
          height={height + 60}
        >
          <g transform={`translate(${bounds.width / 2}, ${height / 2})`}>
            {pieData.map((data, index) => (
              <motion.g
                key={index}
                className="arc"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.path
                  d={(d3.arc() as any).innerRadius(0).outerRadius(radius)(data)}
                  fill={colorScale(data.data.chartColor)}
                  initial={{
                    d: (d3.arc() as any).innerRadius(0).outerRadius(0)(data),
                  }}
                  animate={{
                    d: (d3.arc() as any).innerRadius(0).outerRadius(radius)(
                      data
                    ),
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                <text
                  transform={`translate(${calculateCentroid(
                    d3
                      .arc<DataItem, d3.DefaultArcObject>()
                      .innerRadius(0)
                      .outerRadius(radius)
                  )(data)})`}
                  textAnchor="middle"
                >
                  {data.data.label}
                </text>
              </motion.g>
            ))}
          </g>

          <g className="legend" transform={`translate(${0}, ${height + 20})`}>
            {legendItems}
          </g>
        </svg>
      )}
    </div>
  );
}
