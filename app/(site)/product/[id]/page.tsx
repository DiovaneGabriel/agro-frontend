"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Loading, OptionProps, Select } from "dbarbieri-react-ui";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import SelectSupabase from "@/app/components/SelectSupabase";
import { FaLeaf } from "react-icons/fa";

type Props = {
  params: { id: number };
};

const Search = ({ params }: Props) => {


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any>();
  const [cultures, setCultures] = useState<any[]>();
  const [classes, setClasses] = useState<any[]>();
  const [actionModes, setActionModes] = useState<any[]>();
  const [companies, setCompanies] = useState<any[]>();
  const [pragues, setPragues] = useState<any[]>();

  const loadData = async (productId: number) => {
    const [
      { data: responseCultures, error: errorCultures },
      { data: responseClasses, error: errorClasses },
      { data: responseActionModes, error: errorActionModes },
      { data: responseCompanies, error: errorCompanies },
      { data: responsePragues, error: errorPragues }
    ] = await Promise.all([
      supabase.from('product_cultures').select('cultures(name)').order('cultures(name)').eq('product_id', productId),
      supabase.from('product_classes').select('classes(name)').order('classes(name)').eq('product_id', productId),
      supabase.from('product_action_modes').select('action_modes(description)').order('action_modes(description)').eq('product_id', productId),
      supabase.from('product_companies').select('companies(name,country:countries(name)),company_type:company_types(name)').order('companies(name)').eq('product_id', productId),
      supabase.from('product_pragues').select('pragues(scientific_name)').order('pragues(scientific_name)').eq('product_id', productId)
    ])

    if (!errorCultures && !errorClasses && !errorActionModes && !errorCompanies && !errorPragues) {
      setCultures(responseCultures);
      setClasses(responseClasses);
      setActionModes(responseActionModes);
      setCompanies(responseCompanies);
      setPragues(responsePragues);
      console.log(responsePragues);
    }

  }

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)

      const { data, error } = await supabase
        .from('product_brands')
        .select(`
                id,
                product_id,
                brand_name:name,
                product:products(
                  is_organic,
                  formulation:formulations(description),
                  registration_holder:registration_holders(name),
                  toxicological_class:toxicological_classes(name),
                  environmental_class:environmental_classes(name)

                )
              `)
        .eq('id', params.id)
        .single();

      if (!active) return
      if (error) {
        setError(error.message);
      } else {
        loadData(data.product_id as number);
        setProduct(data);
      }
      setLoading(false)
    }

    if (params.id) {
      load();
    }

    return () => { active = false }
  }, [params])

  return (
    <div className={styles.page}>
      {loading ? <Loading /> :
        <>
          {product &&
            <>
              <div className={styles.header}>
                <h1>{product.brand_name}</h1>
                {product.product.is_organic && <FaLeaf title="Orgânico" />}
              </div>
              <div className={styles.details}>
                <span>Classe Ambiental:</span>
                <p>{product.product.environmental_class.name}</p>
                <span>Classe Toxicológica:</span>
                <p>{product.product.toxicological_class.name}</p>
                <span>Formulação:</span>
                <p>{product.product.formulation.description}</p>
                <span>Titular de Registro:</span>
                <p>{product.product.registration_holder.name}</p>
              </div>
              {classes && classes.length !== 0 &&
                <section className={styles.section}>
                  <h2>Classes</h2>
                  <ul className={styles.data}>
                    {classes.map((row: any, i: number) => <li key={i}>{row.classes.name}</li>)}
                  </ul>
                </section>
              }
              {cultures && cultures.length !== 0 &&
                <section className={styles.section}>
                  <h2>Culturas</h2>
                  <ul className={styles.data}>
                    {cultures.map((row: any, i: number) => <li key={i}>{row.cultures.name}</li>)}
                  </ul>
                </section>
              }
              {actionModes && actionModes.length !== 0 &&
                <section className={styles.section}>
                  <h2>Modos de Ação</h2>
                  <ul className={styles.data}>
                    {actionModes.map((row: any, i: number) => <li key={i}>{row.action_modes.description}</li>)}
                  </ul>
                </section>
              }
              {pragues && pragues.length !== 0 &&
                <section className={styles.section}>
                  <h2>Pragas / Alvos</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Nome Científico</th>
                        <th>Nome Comum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pragues.map((row: any, i: number) =>
                        <tr key={i}>
                          <td>{row.pragues.scientific_name}</td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </section>
              }
              {companies && companies.length !== 0 &&
                <section className={styles.section}>
                  <h2>Empresas</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Empresa</th>
                        <th>País</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies.map((row: any, i: number) =>
                        <tr key={i}>
                          <td>{row.companies.name}</td>
                          <td>{row.companies.country.name}</td>
                          <td>{row.company_type.name}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </section>
              }
            </>
          }
        </>
      }
    </div>
  );
}

export default Search;