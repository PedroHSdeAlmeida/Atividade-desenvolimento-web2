import * as mysql from 'mysql2/promise';
import Livros from './livros';
import Usuario from './Usuario';

export default class BancoDados {
  private conexao: mysql.Connection;


  async conectar() {
    try {
      this.conexao = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'fatec',
        database: 'dw2',
        port: 3306,
      });
      console.log('Conexão com o banco de dados estabelecida');
    } catch (erro) {
      console.log('Erro na conexão com o banco de dados', erro);
    }
  }

  async insereUsuario(usuario: Usuario) {
    await this.conectar();
    await this.conexao.query(
      'INSERT INTO usuario(us_nome, us_senha, us_login) VALUES(?, ?, ?)',
      [usuario.nome, usuario.senha, usuario.login]
    );
    await this.conexao.end();
  }

  async selecionaUsuario(nome: string) {
    await this.conectar();
    const [rows] = await this.conexao.query('SELECT * FROM usuario WHERE us_nome = ?', [nome]);
    await this.conexao.end();
    return rows[0];
  }

  async atualizaUsuario(usuario: Usuario) {
    await this.conectar();
    await this.conexao.query(
      'UPDATE usuario SET us_senha = ?, us_login = ? WHERE us_nome = ?',
      [usuario.senha, usuario.login, usuario.nome]
    );
    await this.conexao.end();
  }

  async removeUsuario(nome: string) {
    await this.conectar();
    await this.conexao.query('DELETE FROM usuario WHERE us_nome = ?', [nome]);
    await this.conexao.end();
  }

  async insereLivro(livro: Livros) {
    await this.conectar();
    await this.conexao.query(
      'INSERT INTO livros(nome, editora, autor) VALUES(?, ?, ?)',
      [livro.nome, livro.editora, livro.autor]
    );
    await this.conexao.end();
  }

  async selecionaLivro(nome: string) {
    await this.conectar();
    const [rows] = await this.conexao.query('SELECT * FROM livros WHERE nome = ?', [nome]);
    await this.conexao.end();
    return rows[0];
  }

  async atualizaLivro(livro: Livros) {
    await this.conectar();
    await this.conexao.query(
      'UPDATE livros SET editora = ?, autor = ? WHERE nome = ?',
      [livro.editora, livro.autor, livro.nome]
    );
    await this.conexao.end();
  }

  async excluiLivro(nome: string) {
    await this.conectar();
    await this.conexao.query('DELETE FROM livros WHERE nome = ?', [nome]);
    await this.conexao.end();
  }
}
