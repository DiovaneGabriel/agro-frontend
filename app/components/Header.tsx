"use client";

import styles from "./Header.module.css";
import { useSearchParams } from "next/navigation";
import Search from "./Search";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <Search />
            </div>
        </header>
    );
};

export default Header;