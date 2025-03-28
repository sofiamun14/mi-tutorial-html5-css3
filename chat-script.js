async function sendMessage(event) {
    event.preventDefault(); // Evitar comportamiento inesperado

    const userInput = document.getElementById("userInput");
    const chatDiv = document.getElementById("chat");
    const message = userInput.value.trim();

    if (!message) return; // Evitar enviar mensajes vacíos

    // Agregar mensaje del usuario
    chatDiv.innerHTML += `<p><strong>Tú:</strong> ${message}</p>`;

    // Enviar mensaje a OpenAI
    const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    const data = await response.json();

    // Agregar respuesta de OpenAI
    chatDiv.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;

    // Limpiar input
    userInput.value = "";
}

// Enviar con botón
document.getElementById("sendButton").addEventListener("click", sendMessage);

// Permitir enviar con Enter
document.getElementById("userInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage(event);
});
