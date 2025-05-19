// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { IonicModule, PopoverController } from '@ionic/angular';
// import { FooterTabsComponent } from "../components/footer-tabs/footer-tabs.component";
// import { Router } from '@angular/router';
// import { MenuPopoverComponent } from '../components/menu-popover/menu-popover.component';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-home-screen',
//   templateUrl: './home-screen.page.html',
//   styleUrls: ['./home-screen.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FooterTabsComponent, FormsModule]
// })
// export class HomeScreenPage implements OnInit {

//   constructor(private router: Router, private popoverCtrl: PopoverController) {}

//   ngOnInit() {}

//   searchText: string = '';
//   selectedFilter: string = 'all'; 

//   chatList = [
//     { name: 'Alice', message: 'Hello', messageStatus: 'sent', unread: false, time: '10:00 AM', unreadCount: 0, group: false },
//     { name: 'Alice', message: 'Hello again', messageStatus: 'seen', unread: false, time: '10:30 AM', unreadCount: 0, group: false },
//     { name: 'Bob', message: 'How are you?', messageStatus: 'received', unread: true, time: '11:00 AM', unreadCount: 2, group: false },
//     { name: 'Group Chat', message: 'Welcome all!', messageStatus: 'received', unread: true, time: '12:00 PM', unreadCount: 4, group: true },
//     { name: 'Charlie', message: 'Ping me later', messageStatus: 'sent', unread: false, time: '1:15 PM', unreadCount: 0, group: false }
//   ];

//   get filteredChats() {
//     let filtered = this.chatList;


//     if (this.selectedFilter === 'read') {
//       filtered = filtered.filter(chat => !chat.unread);
//     } else if (this.selectedFilter === 'unread') {
//       filtered = filtered.filter(chat => chat.unread);
//     } else if (this.selectedFilter === 'groups') {
//       filtered = filtered.filter(chat => chat.group);
//     }

//     if (this.searchText.trim() !== '') {
//       const searchLower = this.searchText.toLowerCase();
//       filtered = filtered.filter(chat =>
//         chat.name.toLowerCase().includes(searchLower) ||
//         chat.message.toLowerCase().includes(searchLower)
//       );
//     }

//     return filtered;
//   }

//   get totalUnreadCount(): number {
//     return this.chatList.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0);
//   }

//   setFilter(filter: string) {
//     this.selectedFilter = filter;
//   }

//   openChat(chat: any) {
//     this.router.navigate(['/chatting-screen']);
//   }

//   async presentPopover(ev: any) {
//     const popover = await this.popoverCtrl.create({
//       component: MenuPopoverComponent,
//       event: ev,
//       translucent: true,
//     });
//     await popover.present();
//   }

// }



import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { FooterTabsComponent } from "../components/footer-tabs/footer-tabs.component";
import { Router } from '@angular/router';
import { MenuPopoverComponent } from '../components/menu-popover/menu-popover.component';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FooterTabsComponent, FormsModule]
})
export class HomeScreenPage implements OnInit {

  constructor(private router: Router, private popoverCtrl: PopoverController) { }

  ngOnInit() { }

  searchText: string = '';
  selectedFilter: string = 'all'; // default selected tab


  currUserId: string | null = localStorage.getItem("userId");

  chatList = [
    { name: 'Alice', userId: '9034223459', message: 'Hello', messageStatus: 'sent', unread: false, time: '10:00 AM', unreadCount: 0, group: false },
    // { name: 'smith', userId: '9034223456', message: 'Hello again', messageStatus: 'seen', unread: false, time: '10:30 AM', unreadCount: 0, group: false },
    { name: 'Bob', userId: '9034223457', message: 'How are you?', messageStatus: 'received', unread: true, time: '11:00 AM', unreadCount: 2, group: false },
    // { name: 'Group Chat', userId: 'groupchat456', message: 'Welcome all!', messageStatus: 'received', unread: true, time: '12:00 PM', unreadCount: 4, group: true },
    // { name: 'karan', userId: '9138152160', message: 'Ping me later', messageStatus: 'sent', unread: false, time: '1:15 PM', unreadCount: 0, group: false }
  ].filter(u => u.userId != this.currUserId);

  get filteredChats() {
    let filtered = this.chatList;

    // Step 1: Apply tab filter
    if (this.selectedFilter === 'read') {
      filtered = filtered.filter(chat => !chat.unread);
    } else if (this.selectedFilter === 'unread') {
      filtered = filtered.filter(chat => chat.unread);
    } else if (this.selectedFilter === 'groups') {
      filtered = filtered.filter(chat => chat.group);
    }

    // Step 2: Apply search filter
    if (this.searchText.trim() !== '') {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(chat =>
        chat.name.toLowerCase().includes(searchLower) ||
        chat.message.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }

  get totalUnreadCount(): number {
    return this.chatList.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0);
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  openChat(chat: any) {
    // 1. Set current userId in localStorage (replace with actual login/session logic if needed)
    // localStorage.setItem('userId', 'bob123'); // This is the logged-in user
    // console.log('userId');

    // 2. Navigate to chat screen with receiverId in queryParams
    console.log(chat.userId);
    this.router.navigate(['/chatting-screen'], {
      queryParams: { receiverId: chat.userId }
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: MenuPopoverComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }
}
