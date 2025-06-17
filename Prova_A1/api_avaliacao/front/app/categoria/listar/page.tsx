"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function ListarCategoria() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5003/api/categoria/listar")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  return (
    <div>
      <h1>Listagem de categorias</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria: any) => (
            <tr key={categoria.categoriaId}>
              <td>{categoria.categoriaId}</td>
              <td>{categoria.nome}</td>
              <td>{new Date(categoria.criadoEm).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarCategoria;