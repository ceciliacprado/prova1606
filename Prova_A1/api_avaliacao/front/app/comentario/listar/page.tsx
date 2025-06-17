"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function ListarComentario() {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5003/api/comentario/listar")
      .then((response) => {
        setComentarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar comentarios:", error);
      });
  }, []);

  return (
    <div>
      <h1>Listagem de Comentários</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Texto</th>
            <th>Item ID</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map((comentario: any) => (
            <tr key={comentario.comentarioId}>
              <td>{comentario.comentarioId}</td>
              <td>{comentario.texto}</td>
              <td>{comentario.itemId}</td>
              <td>{new Date(comentario.data).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarComentario;