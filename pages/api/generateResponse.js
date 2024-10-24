import { chatSession } from '@/utils/GeminiAIModal'; // Ensure this path is correct

const sanitizeJsonResponse = (responseText) => {
  let cleanedResponse = responseText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/}\s*{/g, '}, {')
    .replace(/"\s*"/g, '", "')
    .replace(/,(?=\s*})/g, '')
    .replace(/}\s*]/g, '}]');

  return cleanedResponse;
};

const cleanUpResponse = (response) => {
  // Remove unnecessary markdown symbols and extra whitespace
  return response
    .replace(/^\s*##\s*/gm, '') // Remove markdown headers (##)
    .replace(/^\s*\*\*\*\s*/gm, '') // Remove markdown bold symbols (****)
    .replace(/^\s*\*\*\s*/gm, '') // Remove markdown bold symbols (**)
    .replace(/\*\*\*/g, '') // Remove remaining bold symbols
    .replace(/^\s*\*\s*/gm, '') // Remove markdown bullet points (*)
    .replace(/\s+$/, '') // Trim trailing whitespace
    .replace(/^\s+/g, ''); // Trim leading whitespace
};

const cleanAndParseJson = (responseText) => {
  const sanitizedResponse = sanitizeJsonResponse(responseText);
  try {
    const fixedResponse = sanitizedResponse.replace(/: None/g, ': null');
    return JSON.parse(fixedResponse);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.error('Sanitized Response:', sanitizedResponse);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, conversationHistory } = req.body;

    const interviewInstructions = `
      You are an AI interviewer named Troi AI. Your task is to conduct a structured interview with the candidate. Follow these guidelines:

      1. **Interview Goals**:
        - Assess the candidate's communication skills, technical knowledge, and problem-solving abilities.
        - Provide a mix of behavioral and technical questions.
        - Ensure the conversation is friendly and professional.

      2. **Interview Structure**:
        - Start with basic introductions.
        - Follow up with behavioral questions.
        - Proceed with technical questions based on the candidate's responses.
        - End with a question about the candidate's future goals or career aspirations.

      3. **Tone and Style**:
        - Be professional but approachable.
        - Encourage the candidate to elaborate on their answers.
        - If the candidate provides an off-topic or insufficient response, ask follow-up questions to bring them back on track or clarify.

      4. **Specific Instructions**:
        - Keep the questions open-ended to allow detailed answers.
        - If the candidate's response is too brief or off-topic, encourage them to expand or clarify.
        - If the candidate provides a response that is not satisfactory, prompt them to provide more details.
      Continue the interview now. Here is the conversation history:
      ${conversationHistory}
      AI: ${message}
    `;

    try {
      const interviewResult = await chatSession.sendMessage(interviewInstructions);
      const interviewResponseText = await interviewResult.response.text();

      // Log the raw AI response text to the terminal
      console.log('AI Response Text:', interviewResponseText);
      console.log('History Text:', conversationHistory);

      let interviewQuestions;
      try {
        // Clean and parse the response
        interviewQuestions = cleanUpResponse(interviewResponseText);
        
        // Log parsed response if needed
        console.log('Parsed Interview Questions:', interviewQuestions);

        res.status(200).json({ response: interviewResponseText });
      } catch (jsonError) {
        console.error("Error parsing JSON response, returning as text:", jsonError);
        res.status(200).json({ response: interviewResponseText });
      }
    } catch (error) {
      console.error("Error starting interview:", error);
      res.status(500).json({ error: 'Failed to start the interview' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
