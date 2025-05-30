// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-chatting-screen',
//   templateUrl: './chatting-screen.page.html',
//   styleUrls: ['./chatting-screen.page.scss'],
//   imports: [IonicModule, CommonModule]
// })
// export class ChattingScreenPage implements OnInit {

//   constructor(private router: Router) { }

//   goToCallingScreen() {
//     this.router.navigate(['/calling-screen']);
//   }

//   ngOnInit() {
//   }

// }



// import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { SocketService } from '../../services/socket.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-chatting-screen',
//   standalone: true,
//   imports: [CommonModule, FormsModule, IonicModule],
//   templateUrl: './chatting-screen.page.html',
//   styleUrls: ['./chatting-screen.page.scss']
// })
// export class ChattingScreenPage implements OnInit, OnDestroy {
//   messages: any[] = [];
//   messageText: string = '';
//   receiverId: string = '';
//   senderId: string = '';
//   private messageSub: Subscription | undefined;

//   private socketService = inject(SocketService);
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);

//   ngOnInit() {
//     // this.senderId = localStorage.getItem('userId') || '';
//     // this.receiverId = this.route.snapshot.queryParamMap.get('receiverId') || '';
//     // console.log(this.senderId);
//     // console.log(this.receiverId);
//     // this.loadFromLocalStorage();

//     // this.messageSub = this.socketService.onMessage().subscribe((msg: any) => {
//     //   const isCurrentChat =
//     //     (msg.sender_id === this.receiverId && msg.receiver_id === this.senderId) ||
//     //     (msg.sender_id === this.senderId && msg.receiver_id === this.receiverId);

//     //   if (isCurrentChat) {
//     //     this.messages.push(msg);
//     //     this.saveToLocalStorage();
//     //   }
//     // });
//   }


//   ngAfterViewInit() {
//   setTimeout(() => {
//     this.senderId = localStorage.getItem('userId') || '';
//     this.receiverId = this.route.snapshot.queryParamMap.get('receiverId') || '';
//     console.log(this.senderId);
//     console.log(this.receiverId);
//     this.loadFromLocalStorage();

//     this.messageSub = this.socketService.onMessage().subscribe((msg: any) => {
//       const isCurrentChat =
//         (msg.sender_id === this.receiverId && msg.receiver_id === this.senderId) ||
//         (msg.sender_id === this.senderId && msg.receiver_id === this.receiverId);

//       if (isCurrentChat) {
//         this.messages.push(msg);
//         this.saveToLocalStorage();
//       }
//     });
//   });
// }


//   saveToLocalStorage() {
//     localStorage.setItem(this.receiverId, JSON.stringify(this.messages));
//   }
//   loadFromLocalStorage() {
//     this.messages = JSON.parse(localStorage.getItem(this.receiverId) as unknown as string) || []
//   }

//   goToCallingScreen() {
//     console.log('Navigating to calling screen...');
//      this.router.navigate(['/calling-screen']);
//    }

//   sendMessage() {
//     if (!this.messageText.trim()) return;

//     const message = {
//       type: "private",
//       sender_id: this.senderId,
//       receiver_id: this.receiverId,
//       text: this.messageText,
//       timestamp: new Date().toLocaleTimeString()
//     };

//     // this.messages.push(message);
//     this.socketService.sendMessage(message);
//     this.messageText = '';
//   }

//   ngOnDestroy() {
//     this.messageSub?.unsubscribe();
//   }
// }




import { Component, OnInit, OnDestroy, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SocketService } from '../../services/socket.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-chatting-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './chatting-screen.page.html',
  styleUrls: ['./chatting-screen.page.scss']
})
export class ChattingScreenPage implements OnInit, AfterViewInit, OnDestroy {
  messages: any[] = [];
  messageText: string = '';
  receiverId: string = '';
  senderId: string = '';
  receiverPublicKeyHex: string = '';
  private messageSub: Subscription | undefined;

  private socketService = inject(SocketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // receiverPhoneNumber: string = '+919138152160'; // static
  receiverPhoneNumber: string = ''; // static

  
  constructor(private encryptionService: EncryptionService,private apiService:ApiService) { }

  @ViewChild('scrollContainer') private scrollContainer: ElementRef | undefined;

  ngOnInit() {
    this.senderId = localStorage.getItem('userId') || '';
    // this.receiverId = this.route.snapshot.queryParamMap.get('receiverId') || '';
    //  this.receiverPhoneNumber = this.route.snapshot.paramMap.get('receiverId') || '';
     this.receiverPhoneNumber = '+919138152160';//----khusha-----------from getting url append +91 or + as created problem while getting with + 

    console.log('Sender:', this.senderId);
    console.log('Receiver:', this.receiverId);
    this.loadFromLocalStorage();

    // this.messageSub = this.socketService.onMessage().subscribe((msg: any) => {
    //   const isCurrentChat =
    //     (msg.sender_id === this.receiverId && msg.receiver_id === this.senderId) ||
    //     (msg.sender_id === this.senderId && msg.receiver_id === this.receiverId);

    //   if (isCurrentChat) {
    //     this.messages.push(msg);
    //     this.saveToLocalStorage();
    //     this.scrollToBottom();
    //   }
    // });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToBottom(), 300);
  }

  // sendMessage() {
  //   if (!this.messageText.trim()) return;

  //   const message = {
  //     type: 'private',
  //     sender_id: this.senderId,
  //     receiver_id: this.receiverId,
  //     text: this.messageText.trim(),
  //     timestamp: new Date().toLocaleTimeString()
  //   };

  //   // Push sent message locally for immediate UI response
  //   this.messages.push(message);
  //   this.saveToLocalStorage();
  //   this.scrollToBottom();

  //   // Send to server
  //   this.socketService.sendMessage(message);

  //   // Clear input
  //   this.messageText = '';
  // }
  userID:String="";
  lastMessageResponse:String="";
async sendMessage() {
  this.userID = "28";
  // Step 1: Get receiver's public key using ApiService
  if (!this.receiverPublicKeyHex) {
    const response = await firstValueFrom(
      this.apiService.get<{ publicKeyHex: string }>(
        `/api/users/profile?user_id=${this.userID}`
      )
    );
    this.receiverPublicKeyHex = response.publicKeyHex;
  }

  // Step 2: Build encrypted payload
  const payload = await this.encryptionService.buildEncryptedPayload(
    this.messageText,
    this.receiverPhoneNumber,
    this.receiverPublicKeyHex
  );

  console.log('Encrypted Payload:', payload);

//   {
//     "senderId": 28,
//     "receiverPhoneNumber": "+911234567890",
//     "encryptedMessage": {
//         "iv": "7f12b085a95dc196290c6ba6a75ed201",
//         "encryptedText": "baa377dc851af7627e7c165233aa87df"
//     },
//     "messageType": "text"
// }

  // Step 3: Send encrypted payload (via WebSocket or HTTP)
  // Example:
  // this.socketService.emit('sendMessage', payload);
  // this.socketService.emitMessage(payload); // <- EMIT METHOD CALLED HERE

   // Emit with callback to receive response from server
 try {
  const result = await this.socketService.emitMessage(payload);
  console.log('Message sent, server returned:', result);
  this.lastMessageResponse = result;
} catch (err) {
  console.error('Failed to send message:', err);
}

  // or
  // await this.apiService.post('/api/messages/send', payload).toPromise();


  // post: https://telldemm-backend.onrender.com/api/chats/send

}







  saveToLocalStorage() {
    localStorage.setItem(this.receiverId, JSON.stringify(this.messages));
  }

  loadFromLocalStorage() {
    this.messages = JSON.parse(localStorage.getItem(this.receiverId) || '[]');
  }

  scrollToBottom() {
    try {
      setTimeout(() => {
        if (this.scrollContainer) {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.warn('Scroll error:', err);
    }
  }

  goToCallingScreen() {
    this.router.navigate(['/calling-screen']);
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
  }
}
