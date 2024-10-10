import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Settings() {
  const currencyText = "Select Currency";
  const [acceptedCurrencies, _] = useState(["MKD", "$", "€"]);
  const [settings, setSettings] = useState<any>({});
  const [selectedCurrency, setSelectedCurrency] = useState(
    settings ? settings.currency : "MKD"
  );

  useEffect(() => {
    console.log(selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const { data, error } = await supabase.from("site_settings").select("*");
    if (error) return console.log(error);
    console.log(data);
  };

  useEffect(() => {
    const currencyData = JSON.parse(localStorage.getItem("siteSettings")!);

    setSelectedCurrency(currencyData.currency);
  }, []);

  const handleSelectCurrency = async (e: any) => {
    if (e.target.value != currencyText) {
      const { data, error } = await supabase
        .from("site_settings")
        .update({ currency: e.target.value })
        .eq("id", 0);
      if (error) return console.log(error);
      if (data) console.log(data);

      setSelectedCurrency(e.target.value);
    }
  };
  const renderAcceptedCurrencies = () => {
    return (
      <select
        name="selectCurrency"
        className="w-full flex justify-center items-center h-8 px-2 rounded-2xl border-r-8 border-white"
        onChange={(e: any) => {
          handleSelectCurrency(e);
        }}
      >
        <option value={currencyText}>{currencyText}</option>
        {acceptedCurrencies.map((item: any, index: number) => (
          <option value={item} key={item + index}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div>
      <div className="text-black">{renderAcceptedCurrencies()}</div>
    </div>
  );
}
