"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";
import { OptionProps, Select } from "dbarbieri-react-ui";

export default function Home() {

  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('s') || '');
  const options: OptionProps[] = [{ key: "1", value: "test" }]

  return (
    <div className={styles.page}>
      <div className={styles.filters}>
        <h1>{search}</h1>
        <span>1.213 resultados</span>
        <form>
          <Select label="Grupo Químico" options={options}></Select>
          <Select label="Ingrediente Ativo" options={options}></Select>
          <Select label="Classe" options={options}></Select>
          <Select label="Mecanismo de Ação" options={options}></Select>
          <Select label="Modo de Ação" options={options}></Select>
          <Select label="Cultura" options={options}></Select>
          <Select label="Praga" options={options}></Select>
          <Select label="Praga Nome Comum" options={options}></Select>
          <Select label="Formulação" options={options}></Select>
          <Select label="Classe Toxicológica" options={options}></Select>
          <Select label="Classe Ambiental" options={options}></Select>
          <Select label="Marca" options={options}></Select>
        </form>
      </div>
      <div className={styles.results}></div>
    </div>
  );
}
