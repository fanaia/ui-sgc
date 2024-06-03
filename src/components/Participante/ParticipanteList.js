// ParticipanteList.js
import React, { useEffect, useState } from "react";
import ParticipanteCard from "./ParticipanteCard";
import apiRetaguarda from "../../config/apiRetaguarda";

const ParticipanteList = () => {
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await apiRetaguarda.get("/participantes");
      setParticipantes(result.data);
    } catch (error) {
      console.error("Erro ao buscar participantes: " + error.message);
    }
  };

  return (
    <div>
      {participantes.map((participante) => (
        <ParticipanteCard
          _id={participante._id}
        />
      ))}
    </div>
  );
};

export default ParticipanteList;
