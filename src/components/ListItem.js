// ListCard.js
import React, { useContext } from "react";
import CrudContext from "../contexts/CrudContext";
import { Button } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";

const ListItem = ({ ComponentCard }) => {
  const { title, itens, setShowModal, setSelectedItem } = useContext(CrudContext);

  const handleAdicionar = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-1">
        <h1 style={{ marginLeft: "10px" }}>{title}</h1>
        <Button
          onClick={handleAdicionar}
          className="btn btn-link mb-3 border-0 btn-no-hover btn-outline-none"
          style={{ fontSize: "35px", backgroundColor: "transparent" }}
        >
          <BsPlusCircleFill />
        </Button>
      </div>
      {itens.map((item) => (
        <ComponentCard key={item._id} item={item} />
      ))}
    </>
  );
};

export default ListItem;
