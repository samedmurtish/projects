import { supabase } from "./lib/supabase";

export default function Home() {
  const createProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .insert({ name: "test", price: 150 });
    if (error) console.log(error);
    if (data) console.log(data);
  };
  // createProduct();
  return <></>;
}
