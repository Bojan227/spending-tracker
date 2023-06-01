import { useEffect, useRef } from "react";
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
  const svgRef = useRef<SVGSVGElement | null>(null);

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
  const height = 400;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  useEffect(() => {
    if (!yearlyData[0]?.categoryId) return;
    if (!categories) return;

    // Create scales for x and y axes
    const xScale = d3
      .scaleBand()
      .domain(yearlyData.map((d) => d.categoryId as string))
      .range([marginLeft, width - marginRight])
      .padding(0.2);

    const maxValue = d3.max(yearlyData, (e) => e.transactions.amount);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue || 0])
      .range([height - marginBottom, marginTop]);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(yearlyData)
      .join("rect")
      .attr("x", (d) => xScale(d.categoryId as string)!)
      .attr("y", (d) => yScale(d.transactions.amount as number))
      .attr(
        "height",
        (d) => yScale(0) - yScale(d.transactions.amount as number)
      )
      .attr("width", xScale.bandwidth())
      .attr("fill", (d) => d.chartColor);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickFormat((y) => (y as number).toFixed())
      )

      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 15)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Amount")
      );
  }, [yearlyData.length, categories.length]);

  return (
    <div ref={ref} className="bar-chart">
      <svg ref={svgRef} width={bounds.width} height={400}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}
