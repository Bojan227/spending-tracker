import useMeasure from "react-use-measure";
import * as d3 from "d3";
import { Category, TransactionResponse } from "@/types";

interface GroupedTransactionYearly {
  categoryId: string;
  chartColor: string;
  transactions: { amount: number; transactionType: string };
}

export default function YearlyBarChart({
  transactions,
  categories,
}: {
  transactions: TransactionResponse[];
  categories: Category[];
}) {
  let [ref, bounds] = useMeasure();

  const yearlyData: GroupedTransactionYearly[] = transactions
    .filter((transaction) => transaction.transactionType === "expense")
    .reduce(
      (
        result: GroupedTransactionYearly[],
        transaction: TransactionResponse
      ) => {
        const currentCategory = categories?.find(
          (category) => category.id === transaction.categoryId
        );

        const existingGroup = result.find(
          (group) => group.categoryId === currentCategory?.name
        );

        if (existingGroup) {
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
          });
        }

        return result;
      },
      []
    );

  const width = bounds.width;
  const height = bounds.height;
  const marginTop = 30;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const xScale = d3
    .scaleBand()
    .domain(yearlyData.map((d) => d.categoryId as string))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const maxValue = d3.max(yearlyData, (e) => e.transactions.amount);
  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue || 0])
    .range([height - marginBottom, marginTop]);

  return (
    <div ref={ref} className="bar-chart">
      <svg width={bounds.width} height={400} viewBox={`0 0 ${width} ${height}`}>
        {yearlyData.map((data, i) => (
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

        <g fill="steelblue">
          {yearlyData.map((data) => (
            <rect
              x={xScale(data.categoryId)}
              y={yScale(data.transactions.amount as number)}
              height={yScale(0) - yScale(data.transactions.amount as number)}
              width={xScale.bandwidth() / 2}
              fill={data.chartColor}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
