// import { Injectable } from '@angular/core';
// import { Database, ref, push, onValue } from '@angular/fire/database';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FirebaseChatService {
//   constructor(private db: Database) {}

//   // Send message
//   sendMessage(roomId: string, message: any) {
//     const messagesRef = ref(this.db, `chats/${roomId}`);
//     return push(messagesRef, message);
//   }

//   // Listen for new messages
//   listenForMessages(roomId: string): Observable<any[]> {
//     return new Observable((observer) => {
//       const messagesRef = ref(this.db, `chats/${roomId}`);
//       onValue(messagesRef, (snapshot) => {
//         const data = snapshot.val();
//         const messages = data ? Object.entries(data).map(([key, val]) => ({ key, ...(val as any) })) : [];
//         observer.next(messages);
//       });
//     });
//   }
//}



import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  push,
  onValue,
  set,
  get,
  child
} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseChatService {
  constructor(private db: Database) {}

  /** 🔹 Send message to a chat room (group or 1:1) */
  sendMessage(roomId: string, message: any) {
    const messagesRef = ref(this.db, `chats/${roomId}`);
    return push(messagesRef, message);
  }

  /** 🔹 Listen to all messages in a room (group or 1:1) */
  listenForMessages(roomId: string): Observable<any[]> {
    return new Observable((observer) => {
      const messagesRef = ref(this.db, `chats/${roomId}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messages = data
          ? Object.entries(data).map(([key, val]) => ({
              key,
              ...(val as any)
            }))
          : [];
        observer.next(messages);
      });
    });
  }

  /** ✅ Create a new group */
  async createGroup(groupId: string, groupName: string, members: string[]): Promise<void> {
    const groupRef = ref(this.db, `groups/${groupId}`);
    const memberMap = members.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as Record<string, boolean>);

    await set(groupRef, {
      name: groupName,
      members: memberMap
    });
  }

  /** 🔍 Get group metadata */
  async getGroupInfo(groupId: string): Promise<any> {
    const snapshot = await get(child(ref(this.db), `groups/${groupId}`));
    return snapshot.exists() ? snapshot.val() : null;
  }

  /** 🔍 Get all groups user belongs to */
  async getGroupsForUser(userId: string): Promise<string[]> {
    const snapshot = await get(child(ref(this.db), 'groups'));
    const allGroups = snapshot.val();
    const userGroups: string[] = [];

    if (allGroups) {
      Object.entries(allGroups).forEach(([groupId, groupData]: any) => {
        if (groupData.members?.[userId]) {
          userGroups.push(groupId);
        }
      });
    }

    return userGroups;
  }

  
}
