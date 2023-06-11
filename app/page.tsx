import AddTransactionBox from "./components/AddTransactionBox";
import FilterBox from "./components/FilterBox";
import SummarySection from "./components/SummarySection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.spendings}>
      <FilterBox />
      <SummarySection />
      <AddTransactionBox />
    </main>
  );
}
