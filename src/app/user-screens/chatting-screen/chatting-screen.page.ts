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



import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatting-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './chatting-screen.page.html',
  styleUrls: ['./chatting-screen.page.scss']
})
export class ChattingScreenPage implements OnInit, OnDestroy {
  messages: any[] = [];
  messageText: string = '';
  receiverId: string = '';
  senderId: string = '';
  private messageSub: Subscription | undefined;

  private socketService = inject(SocketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    // this.senderId = localStorage.getItem('userId') || '';
    // this.receiverId = this.route.snapshot.queryParamMap.get('receiverId') || '';
    // console.log(this.senderId);
    // console.log(this.receiverId);
    // this.loadFromLocalStorage();

    // this.messageSub = this.socketService.onMessage().subscribe((msg: any) => {
    //   const isCurrentChat =
    //     (msg.sender_id === this.receiverId && msg.receiver_id === this.senderId) ||
    //     (msg.sender_id === this.senderId && msg.receiver_id === this.receiverId);

    //   if (isCurrentChat) {
    //     this.messages.push(msg);
    //     this.saveToLocalStorage();
    //   }
    // });
  }


  ngAfterViewInit() {
  setTimeout(() => {
    this.senderId = localStorage.getItem('userId') || '';
    this.receiverId = this.route.snapshot.queryParamMap.get('receiverId') || '';
    console.log(this.senderId);
    console.log(this.receiverId);
    this.loadFromLocalStorage();

    this.messageSub = this.socketService.onMessage().subscribe((msg: any) => {
      const isCurrentChat =
        (msg.sender_id === this.receiverId && msg.receiver_id === this.senderId) ||
        (msg.sender_id === this.senderId && msg.receiver_id === this.receiverId);

      if (isCurrentChat) {
        this.messages.push(msg);
        this.saveToLocalStorage();
      }
    });
  });
}


  saveToLocalStorage() {
    localStorage.setItem(this.receiverId, JSON.stringify(this.messages));
  }
  loadFromLocalStorage() {
    this.messages = JSON.parse(localStorage.getItem(this.receiverId) as unknown as string) || []
  }

  goToCallingScreen() {
    console.log('Navigating to calling screen...');
     this.router.navigate(['/calling-screen']);
   }

  sendMessage() {
    if (!this.messageText.trim()) return;

    const message = {
      type: "private",
      sender_id: this.senderId,
      receiver_id: this.receiverId,
      text: this.messageText,
      timestamp: new Date().toLocaleTimeString()
    };

    // this.messages.push(message);
    this.socketService.sendMessage(message);
    this.messageText = '';
  }

  ngOnDestroy() {
    this.messageSub?.unsubscribe();
  }
}


