function verificarLogin() {
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "index.html";
  }

  document.getElementById("usuarioLogado").innerText =
    "Logado como: " + localStorage.getItem("usuario");
}

let chatAtual = "";

let conversas = {
  "Advogado": [
    { texto: "Boa tarde, preciso falar sobre o contrato.", tipo: "recebida" },
    { texto: "Claro, pode falar.", tipo: "enviada" }
  ],
  "Mãe": [
    { texto: "Filho, já almoçou?", tipo: "recebida" },
    { texto: "Já sim 😄", tipo: "enviada" }
  ]
};

function openChat(nome) {
  chatAtual = nome;
  document.getElementById("chatName").innerText = nome;
  carregarMensagens();
  document.getElementById("msg").focus();
}

function carregarMensagens() {
  const area = document.getElementById("messages");
  area.innerHTML = "";

  if (!conversas[chatAtual]) return;

  conversas[chatAtual].forEach(msg => {
    criarMensagem(msg.texto, msg.tipo);
  });
}

function sendMessage() {
  const input = document.getElementById("msg");
  const texto = input.value.trim();

  if (texto === "" || chatAtual === "") {
    return;
  }

  conversas[chatAtual].push({
    texto: texto,
    tipo: "enviada"
  });

  criarMensagem(texto, "enviada");

  input.value = "";
  input.focus();

  setTimeout(() => {
    const resposta = respostaFake(texto);
    conversas[chatAtual].push({
      texto: resposta,
      tipo: "recebida"
    });
    criarMensagem(resposta, "recebida");
  }, 800);
}

function criarMensagem(texto, tipo) {
  const div = document.createElement("div");
  div.classList.add("msg");
  div.classList.add(tipo);
  div.innerText = texto;

  const area = document.getElementById("messages");
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function respostaFake(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("oi") || msg.includes("olá")) return "Oi! Tudo bem?";
  if (msg.includes("tudo bem")) return "Tudo ótimo por aqui! 😄";
  
  const respostas = ["Certo!", "Beleza!", "Vou ver isso.", "👍"];
  return respostas[Math.floor(Math.random() * respostas.length)];
}

document.addEventListener("DOMContentLoaded", () => {
  const inputMsg = document.getElementById("msg");
  if(inputMsg) {
    inputMsg.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});

function carregarListaChats() {
  const lista = document.getElementById("listaChats");
  lista.innerHTML = "";
  for (let nome in conversas) {
    const div = document.createElement("div");
    div.classList.add("chat-item");
    div.innerText = nome;
    div.onclick = () => openChat(nome);
    lista.appendChild(div);
  }
}

function init() {
  verificarLogin();
  carregarListaChats();
}