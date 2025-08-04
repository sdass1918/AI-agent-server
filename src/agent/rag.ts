import fs from 'fs';
import path from 'path';
import { embedText } from '../utils/embeddings';
import { calculateCosineSimilarity } from '../utils/similarity';

export class RAG {
    private documents: string[] = [];
    private embeddings: number[][] = [];

    constructor() {
        this.loadDocuments();
    }

    private loadDocuments() {
        const documentsPath = path.join(__dirname, '../../documents');
        const files = fs.readdirSync(documentsPath);

        files.forEach(file => {
            const filePath = path.join(documentsPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            this.documents.push(content);
        });
    }

    public async embedDocuments() {
        this.embeddings = await Promise.all(this.documents.map(doc => embedText(doc)));
    }

    public async findSimilarChunks(query: string): Promise<string[]> {
        const queryEmbedding = await embedText(query);
        const similarities = this.embeddings.map((embedding, index) => ({
            index,
            similarity: calculateCosineSimilarity(queryEmbedding, embedding),
        }));

        similarities.sort((a, b) => b.similarity - a.similarity);
        const topIndices = similarities.slice(0, 3).map(item => item.index);
        return topIndices.map(index => this.documents[index]);
    }

    public async getRelevantDocuments(query: string): Promise<string[]> {
        return this.findSimilarChunks(query);
    }}