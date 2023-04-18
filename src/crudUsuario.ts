import bancoDados from './db';
import Usuario from './Usuario';
import promptSync from 'prompt-sync';

const prompt = promptSync();
let n = prompt('insira um numero de 1 a 4, sendo que 1 insere um novo usuario, 2 seleciona uma usuario ja existente, 3 atualiza um usuario, e 4 remove um usuario ')

async function main() {
  const bd = new bancoDados();
  await bd.conectar();

  // Inserir novo usuário
  if (n === '1') {
    const novoUsuario: Usuario = {
      nome: prompt('Digite o nome do usuário: '),
      senha: prompt('Digite a senha do novo usuário: '),
      login: prompt('Digite o login do novo usuário: '),
    };
    await bd.insereUsuario(novoUsuario);
    console.log('Novo usuário inserido com sucesso!: ', {novoUsuario});
  }

  // Selecionar usuário pelo nome

  else if (n === '2' ) {
    const nomeUsuario = prompt('Digite o nome do usuário a ser selecionado: ');
    const usuarioSelecionado = await bd.selecionaUsuario(nomeUsuario);
    console.log('Usuário selecionado:', usuarioSelecionado);
  }

  // Atualizar usuário

  else if (n === '3' ) {
    const usuarioAtualizado: Usuario = {
      nome:  prompt('Digite o nome do usuário que deseja alterar: '),
      senha: prompt('Digite a nova senha do usuário: '),
      login: prompt('Digite o novo login do usuário: '),
    };
    await bd.atualizaUsuario(usuarioAtualizado);
    console.log('Usuário atualizado com sucesso!', {usuarioAtualizado});
  }

  // Remover usuário

  else {
  const nomeUsuarioRemover = prompt('Digite o nome do usuário a ser removido: ');
  await bd.removeUsuario(nomeUsuarioRemover);
  console.log('Usuário removido com sucesso!');
  }
}

main().catch(console.error);