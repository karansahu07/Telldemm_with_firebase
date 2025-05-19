// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { io, Socket } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketService {
//   private socket!: Socket;

//   connect(userId: string) {
//     this.socket = io('http://localhost:3000');
//     this.socket.emit('joinChat', userId);
//   }

//   sendMessage(message: { user: string; text: string }) {
//     this.socket.emit('chatMessage', message);
//   }

//   getMessages(): Observable<any> {
//     return new Observable(observer => {
//       this.socket.on('message', msg => {
//         observer.next(msg);
//       });

//       this.socket.on('connectionRejected', msg => {
//         alert('Connection rejected: ' + msg);
//       });

//       this.socket.on('joined', msg => {
//         console.log(msg);
//       });
//     });
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   }
// }



import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment'; // or use your server URL directly
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly serverUrl = 'http://localhost:3000'; // Replace with your actual backend URL

  constructor() {
    const userId = localStorage.getItem('userId');
    this.socket = io(this.serverUrl, {
      // query: { userId }
    });
    this.socket.emit('register-user', userId);
  }

  sendMessage(data: any) {
    this.socket.emit('messageFromUser', data);
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('privateMessageFromServer', (msg) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
