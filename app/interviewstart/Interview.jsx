import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function VoiceInterview() {
  const [conversation, setConversation] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef(null); // To hold the SpeechRecognition instance

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Your browser does not support speech recognition.');
    } else {
      // Initialize SpeechRecognition instance
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const lastTranscript = event.results[event.results.length - 1][0].transcript.trim();
        
        setTranscript(lastTranscript);
        handleSendMessage(lastTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

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

  const handleSendMessage = async (message) => {
    setIsLoading(true); // Start loader animation
    try {
      const conversationHistory = conversation.map(msg => `You: ${msg.user}\nAI: ${msg.ai}`).join('\n');
      console.log('Conversation History:', conversationHistory); // Debugging line

      const { data } = await axios.post('/api/generateResponse', { message, conversationHistory });
      console.log('API Response Data:', data); // Log the full response

      // Clean up the AI response
      const aiResponse = cleanUpResponse(data.response);
      console.log('User Message:', message);
      console.log('AI Response:', aiResponse);

      setConversation(prevConversation => [...prevConversation, { user: message, ai: aiResponse }]);

      // Read AI response
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      window.speechSynthesis.speak(utterance);

      // Handle loader end
      setIsLoading(false);

    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false); // Stop loader animation
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const endInterview = () => {
    stopListening();
    setIsListening(false);
    setConversation([]);
    setTranscript('');
    window.speechSynthesis.cancel(); // Stop any ongoing speech synthesis
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl mb-4">AI-Driven Voice Interview</h1>

      <div className="bg-gray-800 p-4 rounded">
        {conversation.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <p><strong>You:</strong> {msg.user}</p>
            <p><strong>AI:</strong> {typeof msg.ai === 'string' ? msg.ai : JSON.stringify(msg.ai)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {isLoading && <div className="loader">Loading...</div>}
        {isListening && <div className="listening">Listening...</div>}
        <button
          onClick={isListening ? stopListening : startListening}
          className={`px-4 py-2 rounded ${isListening ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button
          onClick={endInterview}
          className="px-4 py-2 rounded bg-gray-500 mt-2"
        >
          End Interview
        </button>
      </div>
      
      <style jsx>{`
        .loader {
          border: 16px solid #f3f3f3;
          border-top: 16px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
          margin: 20px auto;
        }

        .listening {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #f39c12;
          margin: 20px auto;
          padding: 10px;
        }

        .listening::before {
          content: '🔊';
          font-size: 2rem;
          margin-right: 10px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
