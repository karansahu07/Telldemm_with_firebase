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

  constructor(private router: Router, private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  searchText: string = '';
  selectedFilter: string = 'all'; // default selected tab

  chatList = [
    { name: 'Alice', message: 'Hello', messageStatus: 'sent', unread: false, time: '10:00 AM', unreadCount: 0, group: false },
    { name: 'Alice', message: 'Hello again', messageStatus: 'seen', unread: false, time: '10:30 AM', unreadCount: 0, group: false },
    { name: 'Bob', message: 'How are you?', messageStatus: 'received', unread: true, time: '11:00 AM', unreadCount: 2, group: false },
    { name: 'Group Chat', message: 'Welcome all!', messageStatus: 'received', unread: true, time: '12:00 PM', unreadCount: 4, group: true },
    { name: 'Charlie', message: 'Ping me later', messageStatus: 'sent', unread: false, time: '1:15 PM', unreadCount: 0, group: false }
  ];

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
    this.router.navigate(['/chatting-screen']);
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
