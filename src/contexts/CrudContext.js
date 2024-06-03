// CrudContext.js
import React, { useState } from "react";

const CrudContext = React.createContext();

export const CrudProvider = ({
  children,
  title,
  itens,
  saveItem,
  deleteItem,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const value = { title, itens, selectedItem, setSelectedItem, showModal, setShowModal, saveItem, deleteItem};

  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};

export default CrudContext;
