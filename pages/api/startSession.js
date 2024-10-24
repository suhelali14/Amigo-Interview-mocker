import { chatSession } from '@/utils/GeminiAIModal';
import { response } from 'express';

const interviewInstructions = `
You are an AI interviewer. Your task is to conduct a structured interview with the candidate. Follow these guidelines:

1. **Interview Goals**:
   - Assess the candidate's communication skills, technical knowledge, and problem-solving abilities.
   - Provide a mix of behavioral and technical questions.
   - Ensure the conversation is friendly and professional.

2. **Interview Structure**:
   - Start with basic introductions (e.g., "Introduce yourself" and "Tell me about yourself").
   - Follow up with behavioral questions (e.g., "Describe a challenging project you worked on").
   - Proceed with technical questions based on the candidate's responses.
   - End with a question about the candidate's future goals or career aspirations.

3. **Tone and Style**:
   - Be professional but approachable.
   - Encourage the candidate to elaborate on their answers.
   - Provide constructive feedback when necessary.

4. **Specific Instructions**:
   - Keep the questions open-ended to allow the candidate to provide detailed answers.
   - If the candidate asks for clarification, provide additional context.
   - If the candidate's response is too brief, encourage them to expand.

Begin the interview now.

`;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        // Fetch interview questions
        const interviewResult = await chatSession.sendMessage(interviewInstructions);
        const interviewResponseText = await interviewResult.response.text();
        console.log('Interview Response Text:', interviewResponseText);
        const interviewQuestions = cleanAndParseJson(interviewResponseText);

        res.status(200).json({ response: interviewQuestions });
        return (interviewResponseText);
    } catch (error) {
      console.error("Error starting interview:", error);
      res.status(500).json({ error: 'Failed to start the interview' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
