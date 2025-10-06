"use client";

import { Input } from "dbarbieri-react-ui";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [search, setSearch] = useState<string>(searchParams.get('s') || '');

    const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newParams = new URLSearchParams();

        newParams.set("s", search);

        router.push(`/search?${newParams.toString()}`);
    }, [router, search]);

    return (
        <form onSubmit={handleSearch} className="s12">
            <Input dimensions={"s12"} placeholder="O que você está procurando?" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
    );
}
