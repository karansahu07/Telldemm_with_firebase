import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatting-screen',
  templateUrl: './chatting-screen.page.html',
  styleUrls: ['./chatting-screen.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class ChattingScreenPage implements OnInit {

  constructor(private router: Router) { }

  goToCallingScreen() {
    this.router.navigate(['/calling-screen']);
  }

  ngOnInit() {
  }

}
