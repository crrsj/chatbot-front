const mensagensDiv = document.getElementById("mensagens");

async function carregarHistorico() {
  const historico = await fetch("http://localhost:8080/chat/historico")
    .then(res => res.json());

  historico.forEach(msg => {
    adicionarMensagem(msg.conteudo, msg.remetente === "bot" ? "bot" : "usuario");
  });
}

async function enviar() {
  const entrada = document.getElementById("entrada");
  const conteudo = entrada.value.trim();
  if (!conteudo) return;

  adicionarMensagem(conteudo, "usuario");

  const resposta = await fetch("http://localhost:8080/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conteudo })
  }).then(res => res.text());

  adicionarMensagem(resposta, "bot");
  entrada.value = "";
}

function adicionarMensagem(texto, remetente) {
  const div = document.createElement("div");
  div.className = `mensagem ${remetente}`;
  div.textContent = texto;
  mensagensDiv.appendChild(div);
  mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
}

// Carrega o histórico ao abrir
carregarHistorico();

async function carregarHistorico() {
    mensagensDiv.innerHTML = ""; // limpa antes de carregar
  
    const remetente = document.getElementById("filtroRemetente").value.trim().toLowerCase();
    let url = "http://localhost:8080/chat/historico";
  
    if (remetente) {
      url += `?remetente=${remetente}`;
    }
  
    const historico = await fetch(url).then(res => res.json());
  
    historico.forEach(msg => {
      adicionarMensagem(msg.conteudo, msg.remetente === "bot" ? "bot" : "usuario");
    });
  }

  function limparHistorico() {
    document.getElementById("mensagens").innerHTML = "";
  }