import axios from "axios";

export const aiChat = async (req, res) => {
  try {
    const { message, category, country } = req.body;

    let systemPrompt = "";

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

    const groqResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
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
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let reply = groqResponse.data.choices[0].message.content;

    // Safety disclaimer
    if (category === "legal") {
      reply +=
        "\n\n⚠️ This information is for awareness only and not legal advice.";
    }

    if (category === "mental") {
      reply +=
        "\n\n⚠️ This is not medical advice. If you are in distress, please seek professional help.";
    }

    res.json({ reply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI service failed" });
  }
};
