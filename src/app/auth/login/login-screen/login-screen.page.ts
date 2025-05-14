import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginScreenPage implements OnInit {
  showOtpPopup = false;
  phoneNumber: string = '';
  otpValues: string[] = ['', '', '', '', '', ''];

  @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5') otpInputs!: QueryList<ElementRef>;

  constructor(private router: Router) {}

  ngOnInit() {}

  get isPhoneValid(): boolean {
    return /^\d{10}$/.test(this.phoneNumber);
  }

  goToHome() {
    this.router.navigateByUrl('/home-screen');
  }

  onAgreeClick() {
    if (this.isPhoneValid) {
      this.showOtpPopup = true;
    }
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key;
    if (!/^\d$/.test(charCode)) {
      event.preventDefault();
    }
  }

  closeOtpPopup() {
    this.showOtpPopup = false;
  }

  onOtpInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d$/.test(value)) {
      input.value = '';
      this.otpValues[index] = '';
      return;
    }

    this.otpValues[index] = value;

    if (value.length === 1 && index < 5) {
      const inputsArray = this.otpInputs.toArray();
      inputsArray[index + 1].nativeElement.focus();
    }
  }

  handleBackspace(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace') {
      if (input.value === '') {
        this.otpValues[index] = '';
        if (index > 0) {
          const inputsArray = this.otpInputs.toArray();
          inputsArray[index - 1].nativeElement.focus();
        }
      } else {
        this.otpValues[index] = '';
      }
    }
  }

  isOtpComplete(): boolean {
    return this.otpValues.every(val => val !== '');
  }
}
