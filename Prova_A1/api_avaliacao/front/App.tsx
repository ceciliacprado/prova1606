
import ListarItens from './app/itens/listar/page';
import ListarCategoria from './app/categoria/listar/page';
import ListarComentarios from './app/comentario/listar/page';
import LoginUsuario from './app/usuario/login/page';

function App() {
  return (
    <div className="App">
      <h1>Aplicação</h1>
      <ListarItens />
      <ListarCategoria />
      <ListarComentarios />
      <LoginUsuario />
    </div>
  );
}

export default App;