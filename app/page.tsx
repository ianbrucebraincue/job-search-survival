import styles from "./page.module.css";
import LinePlot from "@/components/LinePlot";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Hi Ian</h1>
      <LinePlot data={[1, 2, 3, 4, 5]} />
    </main>
  );
}
