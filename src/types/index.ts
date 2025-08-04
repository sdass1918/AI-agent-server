export interface Message {
    sessionId: string;
    content: string;
    timestamp: Date;
}

export interface Session {
    id: string;
    messages: Message[];
}