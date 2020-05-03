import {
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  users = 0;

  async handleConnection() {
    this.users++;
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    client.broadcast.emit('chat', message);
  }
}
