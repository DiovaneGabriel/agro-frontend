"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Loading } from "dbarbieri-react-ui";
import { supabase } from "@/lib/supabase/client";
import SelectSupabase from "../../components/SelectSupabase";
import Link from "next/link";

const Search = () => {

  const searchParams = useSearchParams();

  const page = 1
  const pageSize = 20

  const [search, setSearch] = useState<string>(searchParams.get('s') || '');

  useEffect(() => {
    setSearch(searchParams.get('s') || '');
  }, [searchParams]);


  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])

  const [culture, setCulture] = useState<string>('')
  const [agroClass, setAgroClass] = useState<string>('')
  const [prague, setPrague] = useState<string>('')
  const [pragueCommonName, setPragueCommonName] = useState<string>('')
  const [actionMechanism, setActionMechanism] = useState<string>('')
  const [activeIngredient, setActiveIngredient] = useState<string>('')
  const [actionMode, setActionMode] = useState<string>('')
  const [registrationHolder, setRegistrationHolder] = useState<string>('')
  const [toxicologicalClass, setToxicologicalClass] = useState<string>('')
  const [environmentalClass, setEnvironmentalClass] = useState<string>('')

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)

      const { data, error } = await supabase.rpc('get_products_ai_page', {
        p_rows_per_page: pageSize,
        p_page: page,
        p_search: search ?? null,

        p_culture_id: culture ? culture : null,
        p_class_id: agroClass ? agroClass : null,
        p_prague_id: prague ? prague : null,
        p_prague_common_name_id: pragueCommonName ? pragueCommonName : null,
        p_action_mechanism_id: actionMechanism ? actionMechanism : null,
        p_active_ingredient_id: activeIngredient ? activeIngredient : null,
        p_action_mode_id: actionMode ? actionMode : null,
        p_registration_holder_id: registrationHolder ? registrationHolder : null,
        p_toxicological_class_id: toxicologicalClass ? toxicologicalClass : null,
        p_environmental_class_id: environmentalClass ? environmentalClass : null,
      })

      if (!active) return
      if (error) setError(error.message)
      else setProducts(data)
      setLoading(false)
    }

    load()
    return () => { active = false }
  }, [page, search, culture, agroClass, prague, pragueCommonName, actionMechanism, activeIngredient, actionMode, registrationHolder, toxicologicalClass, environmentalClass])

  return (
    <div className={styles.page}>
      <div className={styles.filters}>
        <h1>{search}</h1>
        <span>{products.length > 0 ? products[0].total_count : 'nenhum'} resultado{products.length > 1 ? 's' : ''}</span>
        <form>
          <SelectSupabase label="Cultura" table="cultures" value={culture} onChange={(e) => setCulture(e.target.value)} />
          <SelectSupabase label="Classe" table="classes" value={agroClass} onChange={(e) => setAgroClass(e.target.value)} />
          <SelectSupabase label="Praga / Alvo" table="pragues" value={prague} onChange={(e) => setPrague(e.target.value)} valueColumn="scientific_name" />
          <SelectSupabase label="Praga / Alvo Nome Comum" table="prague_common_names" value={pragueCommonName} onChange={(e) => setPragueCommonName(e.target.value)} />
          <SelectSupabase label="Mecanismo de Ação" table="action_mechanisms" value={actionMechanism} onChange={(e) => setActionMechanism(e.target.value)} />
          <SelectSupabase label="Ingrediente Ativo" table="active_ingredients" value={activeIngredient} onChange={(e) => setActiveIngredient(e.target.value)} />
          <SelectSupabase label="Modo de Ação" table="action_modes" value={actionMode} onChange={(e) => setActionMode(e.target.value)} valueColumn="description" />
          <SelectSupabase label="Titular de Registro" table="registration_holders" value={registrationHolder} onChange={(e) => setRegistrationHolder(e.target.value)} />
          <SelectSupabase label="Classe Toxicológica" table="toxicological_classes" value={toxicologicalClass} onChange={(e) => setToxicologicalClass(e.target.value)} />
          <SelectSupabase label="Classe Ambiental" table="environmental_classes" value={environmentalClass} onChange={(e) => setEnvironmentalClass(e.target.value)} />
        </form>
      </div>
      <div className={styles.results}>
        {loading ? <Loading /> :
          <>
            {products.length > 0 ?
              <table>
                <thead>
                  <tr>
                    <th>Marca</th>
                    <th>Ingredientes Ativos</th>
                    <th>Mecanismos de Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any, i) => {
                    return (
                      <tr key={i}>
                        <td><Link href={`/product/${product.brand_id}`}>{product.brand_name}</Link></td>
                        <td><Link href={`/product/${product.brand_id}`}>{product.active_ingredients}</Link></td>
                        <td><Link href={`/product/${product.brand_id}`}>{product.action_mechanism}</Link></td>
                      </tr>

                    );
                  })}
                </tbody>
              </table>
              :
              <i>Nenhum Registro Encontrado</i>}
          </>
        }
      </div>
    </div>
  );
}

export default Search;