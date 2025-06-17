"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function ListarItens() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5003/api/item/listar")
      .then((response) => {
        setItens(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Componente da Listagem de Produtos</h1>
      <table>
        <tr>
            <th>Nome</th>
            <th>Preco</th>
        </tr>
        {itens.map((item : any) => (
            <tr>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
            </tr>
        ))}
      </table>
      
    </div>
  );
}

export default ListarItens;