export default class Usuario {
    public nome:string
    public login:string
    public senha:string


    constructor(nome:string,login:string, senha:string) {
        this.nome = nome
        this.senha = senha
        this.login = login
    }

}