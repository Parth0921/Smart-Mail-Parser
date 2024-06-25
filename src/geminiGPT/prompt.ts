import model from "./intitialise-model.js";
import { generatePrompt, getCategory } from "./prompt-generator.js";

export const getPromptResult = async () => {
  const prompt = generatePrompt(
    "Hi, my name is parth I am interested in working with you. I read the job description and have experience in the field. I am looking forward to hearing from you."
  );
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const category = getCategory(text);
  return { text, category };
};
