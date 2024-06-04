// Etiqueta.js
import React from "react";

const Etiqueta = ({ label, corEtiqueta }) => {
  return (
    <label className="etiqueta" style={{ backgroundColor: corEtiqueta }}>
      {label}
    </label>
  );
};

export default Etiqueta;
