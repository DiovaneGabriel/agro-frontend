import { supabase } from "@/lib/supabase/client";
import { OptionProps, Select, SelectProps } from "dbarbieri-react-ui";
import React, { forwardRef, useEffect, useState } from "react";

type SelectSupabaseProps = Omit<SelectProps, 'options'> & {
    table: string;
    valueColumn?: string;
};

const SelectSupabase = forwardRef<HTMLSelectElement, SelectSupabaseProps>(
    ({ table, valueColumn = "name", ...props }) => {

        const [loading, setLoading] = useState(true)
        const [options, setOptions] = useState<OptionProps[]>([]);

        useEffect(() => {
            //   // setIsLoading(true);
            //   service.brand.select().then((response) => {
            //     setBrandsOptions(response.data.content);
            //   }).catch(e => {
            //     console.error(e);
            //     // }).finally(() => {
            //     //     setIsLoading(false);
            //   });
            const load = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from(table)
                    .select(`id,${valueColumn}`)
                    .order(valueColumn, { ascending: true });

                if (!error) setOptions(data.map((row: any) => { return { key: row.id, value: row[valueColumn] }; }));
                setLoading(false);
            }

            load();
        }, []);

        return (
            <Select {...props} options={options} />
        );
    }
);

export default SelectSupabase;
