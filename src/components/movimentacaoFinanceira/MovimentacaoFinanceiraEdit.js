import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";

const MovimentacaoFinanceiraEdit = forwardRef(({ _id }, ref) => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [movimentacaoFinanceira, setMovimentacaoFinanceira] = useState(selectedItem);
  const [participantes, setParticipantes] = useState([]);
  const [gruposTrabalho, setGruposTrabalho] = useState([]);
  const [projetos, setProjetos] = useState([]);
  
  const _idAutenticado = localStorage.getItem("_id");

  useEffect(() => {
    setSelectedItem(movimentacaoFinanceira);
  }, [movimentacaoFinanceira, setSelectedItem]);

  useEffect(() => {
    const fetchGruposTrabalho = async () => {
      const response = await apiRetaguarda.get("grupos-trabalho");
      setGruposTrabalho(response.data);
    };

    const fetchParticipantes = async () => {
      const response = await apiRetaguarda.get("participantes");
      setParticipantes(response.data);
    };

    const fetchProjetos = async () => {
      const response = await apiRetaguarda.get("projetos");
      setProjetos(response.data);
    };

    fetchGruposTrabalho();
    fetchParticipantes();
    fetchProjetos();
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <FormControl
          as="textarea"
          value={movimentacaoFinanceira?.descricao}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              descricao: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Participante</Form.Label>
        <Form.Select
          value={movimentacaoFinanceira?.participante?._id || _idAutenticado}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              participante: e.target.value,
            })
          }
          disabled
        >
          <option></option>
          {participantes.map((participante) => (
            <option key={participante._id} value={participante._id}>
              {participante.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Grupo de Trabalho</Form.Label>
        <Form.Select
          value={movimentacaoFinanceira?.grupoTrabalho?._id}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              grupoTrabalho: e.target.value,
            })
          }
        >
          <option></option>
          {gruposTrabalho.map((grupo) => (
            <option key={grupo._id} value={grupo._id}>
              {grupo.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Projeto</Form.Label>
        <Form.Select
          value={movimentacaoFinanceira?.projeto?._id}
          onChange={(e) =>
            setMovimentacaoFinanceira({ ...movimentacaoFinanceira, projeto: e.target.value })
          }
        >
          <option></option>
          {projetos.map((projeto) => (
            <option key={projeto._id} value={projeto._id}>
              {projeto.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Valor</Form.Label>
        <FormControl
          type="number"
          value={movimentacaoFinanceira?.valor}
          onChange={(e) =>
            setMovimentacaoFinanceira({ ...movimentacaoFinanceira, valor: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tipo de Movimentação</Form.Label>
        <Form.Select
          value={movimentacaoFinanceira?.tipoMovimentacao}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              tipoMovimentacao: e.target.value,
            })
          }
        >
          <option></option>
          <option value="1">Receber</option>
          <option value="-1">Pagar</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Data da Transação</Form.Label>
        <FormControl
          type="date"
          value={movimentacaoFinanceira?.dataTransacao?.substring(0, 10)}
          onChange={(e) =>
            setMovimentacaoFinanceira({ ...movimentacaoFinanceira, dataTransacao: e.target.value })
          }
        />
      </Form.Group>
    </Form>
  );
});

export default MovimentacaoFinanceiraEdit;
