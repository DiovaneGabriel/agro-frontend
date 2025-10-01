"use client";

import { Input } from "dbarbieri-react-ui";
import { useState } from "react";

export default function Home() {
  const [filterName, setFilterName] = useState<string>('');
  return (
    <div>
      <Input placeholder="O que você está procurando?" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
    </div>
  );
}
