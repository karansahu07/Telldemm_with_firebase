import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu-popover',
  standalone: true, // 
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
  imports: [IonicModule],
})
export class MenuPopoverComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() { }

  selectOption(option: string) {
    // console.log('Selected:', option);
    this.popoverCtrl.dismiss(option); // closes the popover
  }

}
