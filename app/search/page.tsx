"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { OptionProps, Select } from "dbarbieri-react-ui";
import { supabase } from "@/lib/supabase/client";

const Search = () => {

  const searchParams = useSearchParams();

  const page = 1
  const pageSize = 20

  const [search, setSearch] = useState<string>(searchParams.get('s') || '');
  const options: OptionProps[] = [{ key: "1", value: "test" }]

  useEffect(() => {
    setSearch(searchParams.get('s') || '');
  }, [searchParams]);


  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)

      const { data, error } = await supabase.rpc('get_products_ai_page', {
        p_rows_per_page: pageSize,
        p_page: page,
        p_search: search ?? null,
        p_chemical_group_id: null,
        p_active_ingredient_id: null,
        p_class_id: null,
        p_action_mechanism_id: null,
        p_action_mode_id: null,
        p_culture_id: null,
        p_prague_id: null,
        p_prague_common_name_id: null,
        p_formulation_id: null,
        p_toxicological_class_id: null,
        p_environmental_class_id: null,
        p_brand_id: null,
      })

      // const total = count ?? 0
      // const totalPages = Math.max(1, Math.ceil(total / pageSize))

      if (!active) return
      if (error) setError(error.message)
      else setProducts(data)
      setLoading(false)
    }

    load()
    return () => { active = false }
  }, [page, search])

  return (
    <div className={styles.page}>
      <div className={styles.filters}>
        <h1>{search}</h1>
        <span>{products.length > 0 ? products[0].total_count : 'nenhum'} resultado{products.length > 1 ? 's' : ''}</span>
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
      <div className={styles.results}>
        {products.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Ingredientes Ativos</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, i) => {
                return (
                  <tr key={i}>
                    <td>{product.brand_name}</td>
                    <td>{product.active_ingredients}</td>
                  </tr>

                );
              })}
            </tbody>
          </table>
          :
          <i>Nenhum Registro Encontrado</i>}
      </div>
    </div>
  );
}

export default Search;