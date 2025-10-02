"use client";

import { Input } from "dbarbieri-react-ui";
import { useCallback, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState<string>('');

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newParams = new URLSearchParams();

    newParams.set("s", search);
    // newParams.set("page", "1");

    router.push(`/search?${newParams.toString()}`);
  }, [router, search]);

  return (
    <div className={styles.home}>
      <form className={styles.wrapper} onSubmit={handleSearch}>
        <Input dimensions={"s12"} placeholder="O que você está procurando?" value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
    </div>
  );
}
