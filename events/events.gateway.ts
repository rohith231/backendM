import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server } from 'socket.io';
  
  @WebSocketGateway()
  
  export class EventsGateway {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
      return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }
  
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: string): Promise<any> {
      return "Hello! Welcome to Russia";
       // return data;
    }

       @SubscribeMessage("message")
       handleMessage(@MessageBody() message: string): void {
       this.server.send("Hello! Welcome");
    }
     
  
  }


  // import {
  //   MessageBody,
  //   SubscribeMessage,
  //   WebSocketGateway,
  //   WebSocketServer,
  //   WsResponse,
  //   OnGatewayInit,
  // } from "@nestjs/websockets";
  // import { from, Observable } from "rxjs";
  // import { map } from "rxjs/operators";
  // import { Socket, Server } from "socket.io";
  
  // @WebSocketGateway()
  // export class EventsGateway {
  //   @WebSocketServer()
  //   server: Server;
  
  //   @SubscribeMessage("events")
  //   findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //     return from([1, 2, 3]).pipe(
  //       map((item) => ({ event: "events", data: item }))
  //     );
  //   }
  
  //   @SubscribeMessage("identity")
  //   async identity(@MessageBody() data: string): Promise<any> {
  //     return "Hello! Welcome to Russia";
  //   }
  
  //   @SubscribeMessage("message")
  //   handleMessage(@MessageBody() message: string): void {
  //     this.server.send("Hello! Welcome");
  //   }
  
  //   afterInit(server: Server) {
  //     console.log("Init");
  //   }
  
  //   handleDisconnect(client: Socket) {
  //     console.log(`Client disconnected: ${client.id}`);
  //   }
  
  //   handleConnection(client: Socket, ...args: any[]) {
  //     console.log(`Client connected: ${client.id}`);
  //   }
  // }
  