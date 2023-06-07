import ReportPage from "./components/report/Report";
import AddTransactionBox from "./components/AddTransactionBox";
import FilterBox from "./components/FilterBox";
import SummarySection from "./components/SummarySection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.spendings}>
      <AddTransactionBox />
      <FilterBox />
      <SummarySection />
      <ReportPage />
    </main>
  );
}
