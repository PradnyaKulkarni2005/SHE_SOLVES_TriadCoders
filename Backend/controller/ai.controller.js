const axios = require("axios");

exports.aiChat = async (req, res) => {
  try {
    // Extract message, category, and country from request body
    const { message, category, country } = req.body;

    let systemPrompt = "";
    // Set system prompt based on category
    switch (category) {
      case "career":
        systemPrompt =
          "You are a career advisor helping women with career paths, skills, resumes, and job growth.";
        break;

      case "mental":
        systemPrompt =
          "You provide supportive mental health guidance. Do not diagnose. Encourage professional help if distress is serious.";
        break;

      case "business":
        systemPrompt =
          "You are a startup mentor helping women evaluate business ideas with pros, cons, risks, and improvements.";
        break;

      case "legal":
        systemPrompt =
          "You are a legal awareness assistant for women. Explain laws in simple terms. Do not give legal advice. Ask for country if required. Always add a disclaimer.";
        break;

      default:
        systemPrompt = "You are a helpful assistant.";
    }

    //  DEBUG: confirm key is loaded
    console.log("GROQ KEY PRESENT:", !!process.env.GROQ_API_KEY);
// Send request to GROQ API
    const groqResponse = await axios.post(
        
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content:
          category === "legal"
            ? `Country: ${country || "Not specified"}\nQuestion: ${message}`
            : message,
      },
    ],
    temperature: 0.6,
  },
  {
    // headers - response in json format and authorization with GROQ API key
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);
// Extract reply from GROQ response

    let reply = groqResponse.data.choices[0].message.content;
// Added disclaimers for legal and mental health categories
    if (category === "legal") {
      reply += "\n\n⚠️ This information is for awareness only and not legal advice.";
    }

    if (category === "mental") {
      reply +=
        "\n\n⚠️ This is not medical advice. If you are in distress, please seek professional help.";
    }

    res.json({ reply });
  } catch (error) {
    console.error("GROQ ERROR:", error.response?.data || error.message);
    res.status(500).json(error.response?.data || { error: "AI service failed" });
  }
};
