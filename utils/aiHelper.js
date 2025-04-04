// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure you have set this in your environment variables
// });

// const generateMealPlan = async (dietPreference, calorieGoal) => {
//   try {
//     const prompt = `Generate a nutrition-rich meal plan for a ${dietPreference} diet with a daily calorie goal of ${calorieGoal}. Include breakfast, lunch, and dinner with detailed ingredients and calories.`;

//     const response = await openai.createCompletion({
//       model: "gpt-4",
//       prompt,
//       max_tokens: 200,
//     });

//     return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     return null;
//   }
// };

// module.exports = { generateMealPlan };
