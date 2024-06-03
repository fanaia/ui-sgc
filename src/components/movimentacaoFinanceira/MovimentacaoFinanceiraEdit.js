import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";

const MovimentacaoFinanceiraEdit = forwardRef(({ _id }, ref) => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [movimentacaoFinanceira, setMovimentacaoFinanceira] =
    useState(selectedItem);
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
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Descrição</Form.Label>
        <FormControl
          type="text"
          value={movimentacaoFinanceira?.descricao}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              descricao: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Participante</Form.Label>
        <Form.Select
          value={movimentacaoFinanceira?.participante}
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
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>
          Grupo de Trabalho
        </Form.Label>
        <Form.Select
          value={movimentacaoFinanceira?.grupoTrabalho}
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
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Projeto</Form.Label>
        <Form.Select
          value={movimentacaoFinanceira?.projeto}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              projeto: e.target.value,
            })
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
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Valor</Form.Label>
        <FormControl
          type="number"
          value={movimentacaoFinanceira?.valor}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              valor: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>
          Tipo de Movimentação
        </Form.Label>
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
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>
          Chave Pix Transação
        </Form.Label>
        <FormControl
          type="text"
          value={movimentacaoFinanceira?.chavepixtransacao}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              chavepixtransacao: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Origem</Form.Label>
        <FormControl
          type="text"
          value={movimentacaoFinanceira?.origem}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              origem: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Destino</Form.Label>
        <FormControl
          type="text"
          value={movimentacaoFinanceira?.destino}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              destino: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>
          Data da Transação
        </Form.Label>
        <FormControl
          type="date"
          value={movimentacaoFinanceira?.dataTransação}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              dataTransação: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Status</Form.Label>
        <Form.Select
          id="status"
          value={movimentacaoFinanceira?.status}
          onChange={(e) =>
            setMovimentacaoFinanceira({
              ...movimentacaoFinanceira,
              status: e.target.value,
            })
          }
        >
          <option></option>
          <option value="ativo">Ativo</option>
          <option value="pendente">Pendente</option>
          <option value="recusado">Recusado</option>
          <option value="cancelado">Cancelado</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
});

export default MovimentacaoFinanceiraEdit;
