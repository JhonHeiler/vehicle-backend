require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class OpenAIService {
  /**
   * 
   * @param {string} consulta 
   * @param {object} vehiculoInfo 
   * @returns {Promise<object>}
   */
  async getChatResponse(consulta, vehiculoInfo) {
    try {
      
      const promptUsuario = `Consulta: ${consulta}. Información del vehículo: Placa: ${vehiculoInfo.placa}, Marca: ${vehiculoInfo.marca}, Modelo: ${vehiculoInfo.modelo}, Serie: ${vehiculoInfo.serie}, Color: ${vehiculoInfo.color}. Por favor, utiliza estos datos para proporcionar una respuesta completa y detallada.`;

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Eres un asistente experto en información vehicular. Utiliza la información proporcionada para generar respuestas precisas y completas."
          },
          {
            role: "user",
            content: promptUsuario
          }
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
  }
}

module.exports = new OpenAIService();
