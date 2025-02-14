require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class OpenAIService {
  /**
   * 
   * @param {string} consulta - Pregunta realizada por el usuario.
   * @param {object} vehiculoInfo - Objeto con la información del vehículo.
   * @returns {Promise<object>}
   */
  async getChatResponse(consulta, vehiculoInfo) {
    try {
      // Construimos el prompt y le indicamos que use la info vehicular si es relevante,
      // pero que complemente con información general si es necesario.
      const promptUsuario = `
La consulta del usuario es: "${consulta}"

Información del vehículo (para usar si es relevante a la pregunta):
- Placa: ${vehiculoInfo.placa}
- Marca: ${vehiculoInfo.marca}
- Modelo: ${vehiculoInfo.modelo}
- Serie: ${vehiculoInfo.serie}
- Color: ${vehiculoInfo.color}

Responde únicamente con la información solicitada en la pregunta. 
Si la información solicitada no se encuentra en estos datos, complementa con tus conocimientos generales, 
pero indica claramente qué parte proviene de la información proporcionada y cuál es complementaria.
      `.trim();

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
Eres un asistente experto en información vehicular. 
Utiliza la información proporcionada del vehículo y, si es necesario, complementa con tus conocimientos generales 
para responder a la consulta. Asegúrate de diferenciar claramente entre los datos disponibles y la información adicional.
            `.trim()
          },
          {
            role: "user",
            content: promptUsuario
          }
        ]
      });

      return {
        respuesta: aiResponse.choices[0].message.content,
        metodologia: "Este agente fue entrenado con modelos de OpenAI para responder con la información vehicular relevante, complementada con conocimientos generales cuando sea necesario."
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
