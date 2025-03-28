import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// Esta ruta es para el chat general con Gemini
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(userMessage);
        const botReply = result.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error(">> Error en server :", error);
        res.status(500).json({ error: "Error al obtener respuesta" });
    }
});

// ** Nueva ruta para el Tutor LPP **
app.post("/tutor", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Generamos la respuesta de la IA
        const result = await model.generateContent(`
            Eres un tutor de Lenguaje de Programación en Pascal (LPP).
            Solo responde preguntas sobre LPP.
            Si la consulta no es sobre LPP, responde con:
            "Este espacio está destinado a hacer consultas en el contexto de LPP. Para otras preguntas, visita la sección de CHAT allí tendras a tu disposicion Gemini-2.0-flash para responderte."
            Aquí está la pregunta del usuario:
            ${userMessage}
        `);
        
        const botReply = result.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error(">> Error en server (Tutor LPP) :", error);
        res.status(500).json({ error: "Error al obtener respuesta" });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
