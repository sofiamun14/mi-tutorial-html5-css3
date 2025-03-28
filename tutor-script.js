document.getElementById("sendButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const chatDiv = document.getElementById("chat");

    if (!userInput.trim()) return;

    chatDiv.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;

    try {
        const response = await fetch("http://localhost:3000/tutor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        chatDiv.innerHTML += `<p><strong>Tutor LPP:</strong> ${data.reply}</p>`;
        document.getElementById("userInput").value = ""; // Limpiar input
    } catch (error) {
        console.error("Error en tutor:", error);
        chatDiv.innerHTML += `<p style="color: red;">Error al obtener respuesta.</p>`;
    }
});
