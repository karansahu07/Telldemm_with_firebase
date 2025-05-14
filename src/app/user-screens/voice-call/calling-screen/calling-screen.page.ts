import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-calling-screen',
  templateUrl: './calling-screen.page.html',
  styleUrls: ['./calling-screen.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class CallingScreenPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
