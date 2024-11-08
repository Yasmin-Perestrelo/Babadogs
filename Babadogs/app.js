const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");


function saveChatHistory() {
  const messages = Array.from(chatBox.querySelectorAll(".message")).map(msg => ({
    sender: msg.classList.contains("user") ? "user" : "bot",
    text: msg.textContent
  }));
  localStorage.setItem("chatHistory", JSON.stringify(messages));
}


function loadChatHistory() {
  const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  savedHistory.forEach(message => {
    appendMessage(message.sender, message.text);
  });
}


async function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;


  appendMessage("user", message);
  userInput.value = "";

  saveChatHistory();


  const response = await getBotResponse(message);
  appendMessage("bot", response);

  saveChatHistory();
}

async function getBotResponse(userMessage) {
  try {
    const response = await fetch("/api/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    return data.reply || "Desculpe, não entendi.";
  } catch (error) {
    console.error("Erro ao obter resposta:", error);
    return "Houve um erro ao processar sua mensagem.";
  }
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

loadChatHistory();
