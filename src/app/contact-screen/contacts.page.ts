import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { MenuPopoverComponent } from '../components/menu-popover/menu-popover.component'; 
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule],
})
export class ContactsPage implements OnInit {

 contacts = [
  {
    name: 'Riya Sharma',
    message: 'Available',
    image: 'assets/images/user.jfif',
  },
  {
    name: 'Manav Mehta',
    message: 'Busy at work',
    image: 'assets/images/user.jfif',
  },
  {
    name: 'Tanya Verma',
    message: 'Let’s catch up soon!',
    image: 'assets/images/user.jfif',
  },
  {
    name: 'Rohit Bansal',
    message: '❤️ Music is life',
    image: 'assets/images/user.jfif',
  },
  {
    name: 'Priya Singh',
    message: 'Om Namah Shivaya 🚩',
    image: 'assets/images/user.jfif',
  },
  {
    name: 'Grandma Sushma',
    message: 'Call in emergency only',
    image: 'assets/images/user.jfif',
  },
  {
    name: 'Karan Yadav',
    message: '🌞 Good vibes only!',
    image: 'assets/images/user.jfif',
  },
];
  

  constructor(private router: Router,private popoverCtrl: PopoverController, private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {}
   showSearchBar = false;
  keyboardType: 'text' | 'tel' = 'text'; // 'tel' = numeric
  searchText = '';

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleKeyboardType() {
  this.keyboardType = this.keyboardType === 'text' ? 'tel' : 'text';
  setTimeout(() => {
    const input = document.querySelector('ion-input.custom-search-input input') as HTMLElement;
    input?.focus();
  }, 100);
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
