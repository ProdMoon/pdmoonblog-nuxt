export interface WebSocketMessage {
  type: 'message' | 'log' | 'greeting' | 'goodbye';
  message: string;
  timestamp: number;
  senderId?: string;
  senderName?: string;
}
