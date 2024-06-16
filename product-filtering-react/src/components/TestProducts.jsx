import React from "react";
import Data from "../../api/Data";

export default function TestProducts() {
  const { products, loading } = Data();
  return <div>TestProducts</div>;
}
