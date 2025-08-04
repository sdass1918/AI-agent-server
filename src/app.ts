import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { setupAgentRoutes } from './routes/agent';
import { RAG } from './agent/rag';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize RAG and embed documents before handling requests
const rag = new RAG();
rag.embedDocuments().then(() => {
    console.log('Document embeddings ready.');
    // Pass RAG instance to routes if needed
    setupAgentRoutes(app, rag);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to embed documents:', err);
    process.exit(1);
});