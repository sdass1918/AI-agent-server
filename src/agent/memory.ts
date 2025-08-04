class Memory {
    private sessions: Map<string, string[]>;

    constructor() {
        this.sessions = new Map();
    }

    public storeMessage(sessionId: string, message: string): void {
        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, []);
        }
        const messages = this.sessions.get(sessionId)!;
        messages.push(message);
        if (messages.length > 5) { // Keep only the last 5 messages
            messages.shift();
        }
    }

    public retrieveMessages(sessionId: string): string[] {
        return this.sessions.get(sessionId) || [];
    }

    public getRecentMessages(sessionId: string): string[] {
        return this.retrieveMessages(sessionId);
    }
}

export default Memory;