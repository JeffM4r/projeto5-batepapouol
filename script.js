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
    teste.catch(loginError)
    teste.then(keepConnected)
    teste.then(setInterval(keepConnected, 5000))
}

function loginError(){
    alert("Nome inválido, tente outro!")
    window.location.reload()
}

function keepConnected(){
    document.querySelector(".login").style.display = "none"
    axios.post(loginStatus, {name:loginName})
}

function sendMessage(){
    let message = document.querySelector(".msg-value")
    let value = message.value
    if(value !== ""){
        let teste = axios.post(mensagens,
            {
                from:loginName,
                to:"Todos",
                text:value,
                type:"message"
            })
        message.value = ""
        teste.then(getServerMessage)
        teste.catch(LeftChat)    
    }
}

function LeftChat(){
    alert("Usuário desconectado! reiniciando...")
    window.location.reload()
}

function getServerMessage(){
    let serverMsgs = axios.get(mensagens)
    serverMsgs.then(showMessage)
}

function showMessage(msgs){
    let serverMsgs = msgs.data
    let chat = document.querySelector(".room")
    chat.innerHTML = ""
    for(let i=0 ; i<serverMsgs.length ; i++){
        if(serverMsgs[i].type === "status"){
            chat.innerHTML +=`<div class="inOut">
                                <p><span class="time">(${serverMsgs[i].time})</span> <span class="name">${serverMsgs[i].from}</span> ${serverMsgs[i].text}</p>
                              </div>`

        } else if(serverMsgs[i].type === "message"){
            chat.innerHTML +=`<div class="normalMsg">
                                <p><span class="time">(${serverMsgs[i].time})</span> <span class="name">${serverMsgs[i].from}</span> para <span class="name">${serverMsgs[i].to}</span>: ${serverMsgs[i].text}</p>
                              </div>`

        } else if(serverMsgs[i].type === "private_message" && serverMsgs[i].to !== "Todos" && serverMsg[i].to === loginName){
            chat.innerHTML +=`<div class="privateMsg">
                                <p><span class="time">(${serverMsgs[i].time})</span> <span class="name">${serverMsgs[i].from}</span> para <span class="name">${serverMsgs[i].to}</span>: ${serverMsgs[i].text}</p>
                              </div>`

        }
    }
    window.scrollTo(0, document.body.scrollHeight);
}

getServerMessage()
setInterval(getServerMessage, 3000)