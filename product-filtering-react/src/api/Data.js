import { useEffect, useState } from "react";

export default function Data() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = "https://dummyjson.com/products";

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(`${apiUrl}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setError(undefined);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        //setLoading(false);
      });
    return () => {
      controller.abort();
      setLoading(false);
    };
  }, []);

  return {
    products,
    loading,
    error,
  };
}
