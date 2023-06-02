import useMeasure from "react-use-measure";
import * as d3 from "d3";
import { Category, TransactionResponse } from "@/types";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { format, isSameMonth } from "date-fns";
import { barChartConfig } from "@/app/constants/barChartConfig";

interface GroupedTransactionMonthly {
  month: number;
  categoryId: string;
  chartColor: string;
  transactions: { amount: number; transactionType: string };
}

export default function MonthlyBarChart({
  transactions,
  categories,
}: {
  transactions: TransactionResponse[];
  categories: Category[];
}) {
  let [ref, bounds] = useMeasure();

  const monthlyData: GroupedTransactionMonthly[] = useMemo(() => {
    return transactions.reduce(
      (
        result: GroupedTransactionMonthly[],
        transaction: TransactionResponse
      ) => {
        const currentCategory = categories?.find(
          (category) => category.id === transaction.categoryId
        );

        const existingGroup = result.find(
          (group) => group.categoryId === currentCategory?.name
        );

        if (
          existingGroup &&
          isSameMonth(
            new Date(transaction.date.seconds * 1000),
            new Date(existingGroup.month * 1000)
          )
        ) {
          existingGroup.transactions.amount =
            existingGroup.transactions.amount + parseInt(transaction.amount);
        } else {
          result.push({
            categoryId: currentCategory?.name!,
            chartColor: currentCategory?.chartColor!,
            transactions: {
              amount: parseInt(transaction.amount),
              transactionType: transaction.transactionType,
            },
            month: transaction.date.seconds,
          });
        }

        return result;
      },
      []
    );
  }, [transactions, categories]);

  const width = bounds.width;
  const { height, marginTop, marginBottom, marginLeft, marginRight } =
    barChartConfig;

  const xScale = d3
    .scaleBand()
    .domain(monthlyData.map((d) => d.categoryId as string))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const maxValue = d3.max(monthlyData, (e) => e.transactions.amount);
  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue || 0])
    .range([height - marginBottom, marginTop]);

  return (
    <div ref={ref} className="bar-chart">
      <svg
        width={bounds.width}
        height={height + 20}
        viewBox={`0 0 ${width} ${height}`}
      >
        {monthlyData.map((data, i) => (
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
          {monthlyData.map((data, i) => (
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

        <text x={width / 2} y={yScale(maxValue as number) - 20} fill="white">
          {monthlyData[0]?.month &&
            format(new Date(monthlyData[0]?.month * 1000), "MMMM")}
        </text>
      </svg>
    </div>
  );
}
