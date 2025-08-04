# AI Agent Server with RAG, Memory, and Plugins

## Overview
The AI Agent Server is a TypeScript (Node.js) backend that provides an AI-powered agent capable of handling user messages with session-based memory, retrieval-augmented generation (RAG), and plugin execution. The server exposes a POST `/agent/message` endpoint that processes user messages and returns AI-generated replies.

## Features
- **Session-based Memory**: Maintains the last few messages for each session, allowing for context-aware interactions.
- **Retrieval-Augmented Generation (RAG)**: Loads and embeds multiple markdown/text documents, retrieves the top 3 relevant chunks for each user query, and incorporates them into the AI's response.
- **Plugin Execution**: Detects user intent and triggers appropriate plugins, including:
  - **Weather Plugin**: Fetches weather information from a mock or real API.
  - **Math Evaluation Plugin**: Evaluates mathematical expressions and returns the result.
- **Prompt Engineering**: Constructs a system prompt that includes memory, relevant documents, and plugin results to enhance the AI's responses.

## Tech Stack
- **TypeScript**: For type safety and modern JavaScript features.
- **Express**: To handle HTTP requests and define routes.
- **OpenAI API**: For generating AI responses and embedding text.
- **Custom Cosine Similarity**: For vector search to find similar document chunks.
- **Hosting**: The application can be hosted on platforms like Railway or Render.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-agent-server.git
   cd ai-agent-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Server
To start the server, run:
```
npm start
```
The server will be available at `http://localhost:3000`.

### API Endpoint
- **POST /agent/message**
  - **Request Body**:
    ```json
    {
      "message": "Your message here",
      "session_id": "unique_session_identifier"
    }
    ```
  - **Response**:
    ```json
    {
      "reply": "AI-generated response here"
    }
    ```

## Usage Examples
- Send a message to the agent to receive a contextual reply based on previous interactions.
- Use the weather plugin by asking about the weather in a specific location.
- Evaluate mathematical expressions by sending them as messages.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.