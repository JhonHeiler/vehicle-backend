// backend/services/openaiService.js
require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generar respuesta a partir de la consulta del chat.
 * Si el vehículo no existe, se retorna un mensaje personalizado.
 */
exports.getChatResponse = async (consulta, vehiculoInfo) => {
    // Construir respuesta inicial basada en la información del vehículo
    const respuestaVehiculo = `El vehículo con placa ${vehiculoInfo.placa} es un ${vehiculoInfo.marca} ${vehiculoInfo.modelo}, color ${vehiculoInfo.color}, con serie ${vehiculoInfo.serie}.`;
  
    try {
      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Eres un asistente experto en información vehicular basado en una base de datos de vehículos." },
          { role: "user", content: consulta },
          { role: "assistant", content: respuestaVehiculo }
        ]
      });
  
      return {
        respuesta: aiResponse.choices[0].message.content,
        metodologia: "Este agente fue entrenado utilizando modelos de lenguaje de OpenAI y estrategias de retroalimentación mediante respuestas basadas en datos de vehículos."
      };
    } catch (error) {
      console.error("Error en openaiService:", error.message);
      return {
        respuesta: "No se pudo generar la respuesta.",
        metodologia: "Error en la consulta al modelo de OpenAI."
      };
    }
  };
  
