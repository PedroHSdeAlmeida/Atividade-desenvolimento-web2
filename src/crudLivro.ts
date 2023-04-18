import bancoDados from './db';
import Livros from './livros';
import promptSync from 'prompt-sync';

const prompt = promptSync();
let n = prompt('insira um numero de 1 a 4, sendo que 1 insere um novo livro, 2 seleciona uma livro ja existente, 3 atualiza um livro, e 4 remove um livro')

async function main() {
  const bd = new bancoDados();
  await bd.conectar();

  // Inserir novo livro
  if (n === '1') {

    const novoLivro: Livros = {
        nome: prompt('Digite o nome do novo livro: '),
        editora: prompt('Digite a editora do novo livro: '),
        autor: prompt('Digite o autor do novo livro: '),
      };
      await bd.insereLivro(novoLivro);
      console.log('Novo livro inserido com sucesso!', {novoLivro});
  }

  // Selecionar usuário pelo nome

  else if (n === '2' ) {
    const nomeLivro = prompt('Digite o nome do livro a ser selecionado: ');
  const livroSelecionado = await bd.selecionaLivro(nomeLivro);
  console.log('Livro selecionado:', livroSelecionado);
  }

  // Atualizar usuário

  else if (n === '3' ) {
    const livroAtualizado: Livros = {
        nome: prompt('Digite nome do livro que deseja alterar: '),
        editora: prompt('Digite a nova editora do livro: '),
        autor: prompt('Digite o novo autor do livro: '),
      };
      await bd.atualizaLivro(livroAtualizado);
      console.log('Livro atualizado com sucesso!', {livroAtualizado});
  }

  // Remover livro

  else {
    const nomeLivroRemover = prompt('Digite o id do livro a ser removido: ');
    await bd.excluiLivro(nomeLivroRemover);
    console.log('Livro removido com sucesso!');
  }
}

main().catch(console.error);