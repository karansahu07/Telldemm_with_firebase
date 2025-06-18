import { Injectable } from '@angular/core';
import { Database, ref, push, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseChatService {
  constructor(private db: Database) {}

  // Send message
  sendMessage(roomId: string, message: any) {
    const messagesRef = ref(this.db, `chats/${roomId}`);
    return push(messagesRef, message);
  }

  // Listen for new messages
  listenForMessages(roomId: string): Observable<any[]> {
    return new Observable((observer) => {
      const messagesRef = ref(this.db, `chats/${roomId}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messages = data ? Object.entries(data).map(([key, val]) => ({ key, ...(val as any) })) : [];
        observer.next(messages);
      });
    });
  }
}
