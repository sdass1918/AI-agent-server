import Memory from './memory';
import { RAG } from './rag';
import { getWeather } from './plugins/weather';
import { evaluateMath } from './plugins/math';

export async function createPrompt(sessionId: string, userMessage: string, memory: Memory, rag: RAG): Promise<string> {
    const recentMessages = memory.getRecentMessages(sessionId);
    const relevantDocuments = await rag.getRelevantDocuments(userMessage);
    const weatherInfo = getWeather(userMessage);
    const mathResult = evaluateMath(userMessage);

    const prompt = `
        You are an AI assistant. Here is the context:
        Recent Messages: ${recentMessages.join('\n')}
        Relevant Documents: ${relevantDocuments.join('\n')}
        Weather Info: ${weatherInfo}
        Math Result: ${mathResult}
        
        User Message: ${userMessage}
        
        Please provide a helpful response.
    `;

    return prompt;
}