const nomeUsuario = "https://mock-api.driven.com.br/api/v6/uol/participants";
const loginStatus = "https://mock-api.driven.com.br/api/v6/uol/status"
const mensagens = "https://mock-api.driven.com.br/api/v6/uol/messages"
let names,loginName;

function login() {
    names = document.querySelector(".login-value");
    loginName = names.value;
    let teste = axios.post(nomeUsuario, {name:loginName})
    teste.then(document.querySelector(".Entrar-button").style.display = "none")
    teste.then(document.querySelector(".login-value").style.display = "none")
    teste.then(document.querySelector(".loading").style.display = "initial")
}