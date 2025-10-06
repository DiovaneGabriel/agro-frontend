"use client";

import styles from "./page.module.css";
import Search from "./components/Search";

export default function Home() {

  return (
    <div className={styles.home}>
      <div className={styles.wrapper} >
        <Search />
      </div>
    </div>
  );
}
