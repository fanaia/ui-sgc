import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";
import StatusSelect from "../common/StatusSelect";

const MovimentacaoFinanceiraEdit = forwardRef(({ _id }, ref) => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [movimentacaoFinanceira, setMovimentacaoFinanceira] = useState(selectedItem);
  const [participantes, setParticipantes] = useState([]);
  const [gruposTrabalho, setGruposTrabalho] = useState([]);
  const [projetos, setProjetos] = useState([]);

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
          value={movimentacaoFinanceira?.participante?._id}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              participante: e.target.value,
            })
          }
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
        <FormControl
          type="number"
          value={movimentacaoFinanceira?.tipoMovimentacao}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              tipoMovimentacao: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Chave Pix Transação</Form.Label>
        <FormControl
          type="text"
          value={movimentacaoFinanceira?.chavePixTransacao}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              chavePixTransacao: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Origem</Form.Label>
        <FormControl
          type="text"
          value={movimentacaoFinanceira?.origem}
          onChange={(e) =>
            setMovimentacaoFinanceira({ ...movimentacaoFinanceira, origem: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-1">Destino</Form.Label>
        <FormControl
          type="text"
          value={movimentacaoFinanceira?.destino}
          onChange={(e) =>
            setMovimentacaoFinanceira({ ...movimentacaoFinanceira, destino: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Data da Transação</Form.Label>
        <FormControl
          type="date"
          value={movimentacaoFinanceira?.dataTransação}
          onChange={(e) =>
            setMovimentacaoFinanceira({ ...movimentacaoFinanceira, dataTransação: e.target.value })
          }
        />
      </Form.Group>
      <StatusSelect
        status={movimentacaoFinanceira?.status}
        handleStatusChange={(e) =>
          setMovimentacaoFinanceira({ ...movimentacaoFinanceira, status: e.target.value })
        }
      />
    </Form>
  );
});

export default MovimentacaoFinanceiraEdit;
