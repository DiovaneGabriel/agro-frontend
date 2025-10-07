"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Loading, OptionProps, Select } from "dbarbieri-react-ui";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import SelectSupabase from "@/app/components/SelectSupabase";

type Props = {
  params: { id: number };
};

const Search = ({ params }: Props) => {


  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<any>()

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)

      const { data, error } = await supabase
        .from('product_brands')
        .select(`
    id,
    brand_name:name,
    product:products(
      id,

      formulation:formulations(description),
      registration_holder:registration_holders(name),
      toxicological_class:toxicological_classes(name),
      environmental_class:environmental_classes(name),

      product_classes(
        class:classes(name)
      ),

      product_active_ingredients(
        concentration:concentration,
        active_ingredient:active_ingredients(
          name,
          chemical_group:chemical_groups(name),

          active_ingredient_action_mechanisms(
            action_mechanism:action_mechanisms(name, hrac, wssa),
            class:classes(name)
          )
        )
      ),

      product_action_modes(
        action_mode:action_modes(description)
      ),

      product_cultures(
        culture:cultures(name)
      ),

      product_pragues(
        prague:pragues(scientific_name)
      )
    )
  `)
        .eq('id', params.id)
        .single()

      if (!active) return
      if (error) {
        setError(error.message);
      } else {
        setProduct(data);
        console.log(data);
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
              <h1>{product.brand_name}</h1>
              <section>
                <span>Culturas</span>
                {product.product.product_cultures.map((culture: any) => <p>{culture.culture.name}</p>)}
              </section>
            </>
          }
        </>
      }
    </div>
  );
}

export default Search;