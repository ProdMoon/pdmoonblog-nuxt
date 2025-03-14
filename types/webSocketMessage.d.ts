export interface WebSocketMessage {
  type: 'message' | 'log';
  message: string;
  timestamp: number;
  senderId?: string;
  senderName?: string;
}
