import express, { Request, Response } from 'express';
import Memory from '../agent/memory';
import { RAG } from '../agent/rag';
import { createPrompt } from '../agent/prompt';
import { getWeather } from '../agent/plugins/weather';
import { evaluateMath } from '../agent/plugins/math';

const router = express.Router();
const memory = new Memory();

// Accept RAG instance from app.ts
export function setupAgentRoutes(app: express.Application, rag: RAG) {
    app.use('/agent', router);

    router.post('/message', async (req: Request, res: Response) => {
    const { message, session_id } = req.body;

    if (!message || !session_id) {
        return res.status(400).json({ error: 'Message and session_id are required.' });
    }

    // Store the message in memory
    memory.storeMessage(session_id, message);

    // Load relevant documents and embed the query
    const relevantChunks = await rag.getRelevantDocuments(message);

    // Get recent messages for memory
    const recentMessages = memory.getRecentMessages(session_id);

    // Create the system prompt
    const prompt = await createPrompt(session_id, message, memory, rag);

    // Here you would call OpenAI API to get the AI-generated reply
    const aiResponse = await getAIResponse(prompt);

        // Improved intent detection for math
    let pluginResponse = '';
    let mathExpr = '';
    // Try to extract math expression between "is" and "?"
    const mathExprMatch = message.match(/is (.+?)\?/i);
    if (mathExprMatch) {
        mathExpr = mathExprMatch[1];
    } else {
        // fallback: try to find any math-like expression
        const fallbackMatch = message.match(/(\d+[\d\s\+\-\*\/\(\)\.]+)/);
        if (fallbackMatch) mathExpr = fallbackMatch[0];
    }
    if (mathExpr) {
        pluginResponse = String(evaluateMath(mathExpr));
    } else if (message.toLowerCase().includes('weather')) {
        // Extract location from message or use a default
        const locationMatch = message.match(/in ([a-zA-Z\s]+)/i);
        const location = locationMatch ? locationMatch[1].trim() : 'New York';
        pluginResponse = await getWeather(location);
    }

    res.json({ reply: aiResponse, pluginResponse });
});
}

async function getAIResponse(prompt: string): Promise<string> {
    // Implement the logic to call OpenAI API and return the response
    return 'AI-generated response based on the prompt';
}