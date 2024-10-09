import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Settings() {
  const currencyText = "Select Currency";
  const [acceptedCurrencies, _] = useState(["MKD", "$", "€"]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    console.log(selectedCurrency);
  }, [selectedCurrency]);

  const handleSelectCurrency = async (e: any) => {
    if (e.target.value != currencyText) {
      const { data, error } = await supabase
        .from("site_settings")
        .insert({ currency: selectedCurrency })
        .eq("id", 0);
      if (error) return console.log(error);
      if (data) console.log(data);

      setSelectedCurrency(e.target.value);
    }
  };

  return (
    <div>
      <div className="text-black">
        <select
          name="selectCurrency"
          className="w-full flex justify-center items-center h-8 px-2 rounded-2xl border-r-8 border-white"
          onChange={(e: any) => {
            handleSelectCurrency(e);
          }}
        >
          <option value={currencyText}>{currencyText}</option>
          <option value="MKD">MKD</option>
          <option value="$">$</option>
          <option value="€">€</option>
        </select>
      </div>
    </div>
  );
}
