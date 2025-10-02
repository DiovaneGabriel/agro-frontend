"use client";

import { Input } from "dbarbieri-react-ui";
import styles from "./Header.module.css";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const Header = () => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState<string>(searchParams.get('s') || '');
    return (
        <header className={styles.header}>
            <form className={styles.wrapper}>
                <Input dimensions={"s12"} placeholder="O que você está procurando?" value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>
        </header>
    );
};

export default Header;