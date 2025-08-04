import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// export async function embedText(text: string): Promise<number[]> {
//     const response = await openai.createEmbedding({
//         model: 'text-embedding-ada-002',
//         input: text,
//     });

//     return response.data.data[0].embedding;
// }

// export async function embedTexts(texts: string[]): Promise<number[][]> {
//     const response = await openai.createEmbedding({
//         model: 'text-embedding-ada-002',
//         input: texts,
//     });

//     return response.data.data.map(item => item.embedding);
// }

// MOCK EMBEDDINGS FOR LOCAL DEVELOPMENT

export async function embedText(text: string): Promise<number[]> {
    // Return a random vector of length 1536 (same as OpenAI's ada-002)
    return Array.from({ length: 1536 }, () => Math.random());
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
    return texts.map(() => Array.from({ length: 1536 }, () => Math.random()));
}