// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { Router } from '@angular/router';
// import { ViewChildren, QueryList, ElementRef } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login-screen',
//   templateUrl: './login-screen.page.html',
//   styleUrls: ['./login-screen.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule]
// })
// export class LoginScreenPage implements OnInit {
//   showOtpPopup = false;
//   phoneNumber: string = '';
//   otpValues: string[] = ['', '', '', '', '', ''];

//   @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5') otpInputs!: QueryList<ElementRef>;

//   constructor(private router: Router) {}

//   ngOnInit() {}

//   get isPhoneValid(): boolean {
//     return /^\d{10}$/.test(this.phoneNumber);
//   }

//   goToHome() {
//     this.router.navigateByUrl('/home-screen');
//   }

//   onAgreeClick() {
//     if (this.isPhoneValid) {
//       this.showOtpPopup = true;
//     }
//   }

//   allowOnlyNumbers(event: KeyboardEvent) {
//     const charCode = event.key;
//     if (!/^\d$/.test(charCode)) {
//       event.preventDefault();
//     }
//   }

//   closeOtpPopup() {
//     this.showOtpPopup = false;
//   }

//   onOtpInput(event: any, index: number) {
//     const input = event.target as HTMLInputElement;
//     const value = input.value;

//     if (!/^\d$/.test(value)) {
//       input.value = '';
//       this.otpValues[index] = '';
//       return;
//     }

//     this.otpValues[index] = value;

//     if (value.length === 1 && index < 5) {
//       const inputsArray = this.otpInputs.toArray();
//       inputsArray[index + 1].nativeElement.focus();
//     }
//   }

//   handleBackspace(event: KeyboardEvent, index: number) {
//     const input = event.target as HTMLInputElement;
//     if (event.key === 'Backspace') {
//       if (input.value === '') {
//         this.otpValues[index] = '';
//         if (index > 0) {
//           const inputsArray = this.otpInputs.toArray();
//           inputsArray[index - 1].nativeElement.focus();
//         }
//       } else {
//         this.otpValues[index] = '';
//       }
//     }
//   }

//   isOtpComplete(): boolean {
//     return this.otpValues.every(val => val !== '');
//   }
// }


// import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
// import { AuthService } from '../../auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { Router } from '@angular/router'; 

// @Component({
//   selector: 'app-login-screen',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//   ],
//   templateUrl: './login-screen.page.html',
//   styleUrls: ['./login-screen.page.scss'],
// })
// export class LoginScreenPage {
//   phoneNumber = '';
//   countryCode = '+91';
//   showOtpPopup = false;
//   otp: string[] = ['', '', '', '', '', ''];

//   @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5') otpInputs!: QueryList<ElementRef>;

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   allowOnlyNumbers(event: KeyboardEvent) {
//     if (!/^\d$/.test(event.key)) {
//       event.preventDefault();
//     }
//   }

//   isPhoneValid(): boolean {
//     return /^\d{10}$/.test(this.phoneNumber.trim());
//   }

//   isOtpComplete(): boolean {
//     return this.otp.every(d => d.trim().length === 1);
//   }

//   async onAgreeClick() {
//     this.phoneNumber = this.phoneNumber.trim();

//     if (!this.isPhoneValid()) {
//       alert('Please enter a valid 10-digit mobile number.');
//       return;
//     }

//     const fullPhone = `${this.countryCode}${this.phoneNumber}`;

//     try {
//       localStorage.setItem("userId",this.phoneNumber);
//       // await this.authService.initRecaptcha('recaptcha-container');
//       // await this.authService.sendOTP(fullPhone);
//       this.showOtpPopup = true;
//     } catch (err: any) {
//       console.error('Error sending OTP:', err);
//       alert(err?.message || 'Failed to send OTP. Try again.');
//     }
//   }

//   onOtpInput(event: any, index: number) {
//     const input = event.target.value;

//     if (!/^\d$/.test(input)) {
//       this.otp[index] = '';
//       event.target.value = '';
//       return;
//     }

//     this.otp[index] = input;

//     if (input && index < 5) {
//       const nextInput = this.otpInputs.get(index + 1);
//       nextInput?.nativeElement.focus();
//     }
//   }

//   handleBackspace(event: KeyboardEvent, index: number) {
//     if (event.key === 'Backspace') {
//       if (!this.otp[index] && index > 0) {
//         const prevInput = this.otpInputs.get(index - 1);
//         prevInput?.nativeElement.focus();
//       }
//       this.otp[index] = '';
//     }
//   }

//   async goToHome() {
//     if (!this.isOtpComplete()) {
//       alert('Please enter the complete 6-digit OTP.');
//       return;
//     }

//     const code = this.otp.join('');
//     try {
//       // const userCredential = await this.authService.verifyOTP(code);
//       // console.log('Logged in as:', userCredential.user?.phoneNumber);
//       // alert('Login successful!');

//       this.router.navigateByUrl('/home-screen');
//     } catch (err: any) {
//       console.error('OTP verification failed:', err);
//       alert(err?.message || 'Invalid OTP. Please try again.');
//     }
//   }
// }



// import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
// import { AuthService } from '../../auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login-screen',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//   ],
//   templateUrl: './login-screen.page.html',
//   styleUrls: ['./login-screen.page.scss'],
// })
// export class LoginScreenPage {
//   phoneNumber = '';
//   countryCode = '+91';
//   showOtpPopup = false;
//   otp: string[] = Array(6).fill('');

//   countries = [
//     { name: 'India', code: '+91' },
//     { name: 'USA', code: '+1' },
//     { name: 'UK', code: '+44' },
//     { name: 'Australia', code: '+61' },
//     { name: 'Canada', code: '+1' },
//     { name: 'Germany', code: '+49' },
//     { name: 'France', code: '+33' },
//     { name: 'Brazil', code: '+55' },
//     { name: 'South Africa', code: '+27' },
//     { name: 'Russia', code: '+7' },
//     { name: 'China', code: '+86' },
//     { name: 'Japan', code: '+81' },
//     { name: 'Singapore', code: '+65' },
//     { name: 'UAE', code: '+971' },
//     { name: 'New Zealand', code: '+64' },
//     { name: 'Mexico', code: '+52' },
//     { name: 'Italy', code: '+39' },
//     { name: 'Spain', code: '+34' },
//     { name: 'Netherlands', code: '+31' },
//     { name: 'Sweden', code: '+46' }
//   ];

//   @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5') otpInputs!: QueryList<ElementRef>;

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   allowOnlyNumbers(event: KeyboardEvent) {
//     if (!/^\d$/.test(event.key)) {
//       event.preventDefault();
//     }
//   }

//   isPhoneValid(): boolean {
//     return /^\d{10}$/.test(this.phoneNumber.trim());
//   }

//   isOtpComplete(): boolean {
//     return this.otp.every(d => d.trim().length === 1);
//   }

//   onCountryChange(event: any) {
//     const selected = this.countries.find(c => c.name === event.target.value);
//     if (selected) {
//       this.countryCode = selected.code;
//     }
//   }

//   async onAgreeClick() {
//     this.phoneNumber = this.phoneNumber.trim();

//     if (!this.isPhoneValid()) {
//       alert('Please enter a valid 10-digit mobile number.');
//       return;
//     }

//     const fullPhone = `${this.countryCode}${this.phoneNumber}`;

//     try {
//       localStorage.setItem("userId", this.phoneNumber);
//       // await this.authService.initRecaptcha('recaptcha-container');
//       // await this.authService.sendOTP(fullPhone);
//       this.showOtpPopup = true;
//     } catch (err: any) {
//       console.error('Error sending OTP:', err);
//       alert(err?.message || 'Failed to send OTP. Try again.');
//     }
//   }

//   onOtpInput(event: any, index: number) {
//     const input = event.target.value;
//     if (!/^\d$/.test(input)) {
//       this.otp[index] = '';
//       event.target.value = '';
//       return;
//     }

//     this.otp[index] = input;

//     if (input && index < this.otp.length - 1) {
//       this.otpInputs.get(index + 1)?.nativeElement.focus();
//     }
//   }

//   handleBackspace(event: KeyboardEvent, index: number) {
//     if (event.key === 'Backspace') {
//       if (!this.otp[index] && index > 0) {
//         this.otpInputs.get(index - 1)?.nativeElement.focus();
//       }
//       this.otp[index] = '';
//     }
//   }

//   async goToHome() {
//     if (!this.isOtpComplete()) {
//       alert('Please enter the complete 6-digit OTP.');
//       return;
//     }

//     const code = this.otp.join('');
//     try {
//       // const userCredential = await this.authService.verifyOTP(code);
//       // alert('Login successful!');
//       this.router.navigateByUrl('/home-screen');
//     } catch (err: any) {
//       console.error('OTP verification failed:', err);
//       alert(err?.message || 'Invalid OTP. Please try again.');
//     }
//   }
// }




// import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login-screen',
//   standalone: true,
//   imports: [CommonModule, FormsModule, IonicModule],
//   templateUrl: './login-screen.page.html',
//   styleUrls: ['./login-screen.page.scss'],
// })
// export class LoginScreenPage {
//   phoneNumber = '';
//   countryCode = '+91';
//   showOtpPopup = false;
//   otp: string[] = Array(6).fill('');

//   countries = [
//     { name: 'India', code: '+91' },
//     { name: 'USA', code: '+1' },
//     { name: 'UK', code: '+44' },
//     { name: 'Australia', code: '+61' },
//     { name: 'Canada', code: '+1' },
//     { name: 'Germany', code: '+49' },
//     { name: 'France', code: '+33' },
//     { name: 'Brazil', code: '+55' },
//     { name: 'South Africa', code: '+27' },
//     { name: 'Russia', code: '+7' },
//     { name: 'China', code: '+86' },
//     { name: 'Japan', code: '+81' },
//     { name: 'Singapore', code: '+65' },
//     { name: 'UAE', code: '+971' },
//     { name: 'New Zealand', code: '+64' },
//     { name: 'Mexico', code: '+52' },
//     { name: 'Italy', code: '+39' },
//     { name: 'Spain', code: '+34' },
//     { name: 'Netherlands', code: '+31' },
//     { name: 'Sweden', code: '+46' }
//   ];

//   @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5') otpInputs!: QueryList<ElementRef>;

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   allowOnlyNumbers(event: KeyboardEvent) {
//     if (!/^\d$/.test(event.key)) event.preventDefault();
//   }

//   isPhoneValid(): boolean {
//     return /^\d{10}$/.test(this.phoneNumber.trim());
//   }

//   isOtpComplete(): boolean {
//     return this.otp.every(d => d.trim().length === 1);
//   }

//   onCountryChange(event: any) {
//     const selected = this.countries.find(c => c.name === event.target.value);
//     if (selected) {
//       this.countryCode = selected.code;
//     }
//   }

//   async onAgreeClick() {
//     this.phoneNumber = this.phoneNumber.trim();
//     if (!this.isPhoneValid()) {
//       alert('Please enter a valid 10-digit mobile number.');
//       return;
//     }

//     const fullPhone = `${this.countryCode}${this.phoneNumber}`;
//     const payload = { phone: fullPhone };

//     try {
//       const res: any = await this.http.post('https://websocket-8rgr.onrender.com/api/send-otp', payload).toPromise();
//       console.log('OTP sent response:', res);
//         console.log('Body:', res.body);

//       if (res.status) {
//         this.showOtpPopup = true;
//         localStorage.setItem("userId", this.phoneNumber);
//       } else {
//         alert(res.message || 'Failed to send OTP.');
//       }
//     } catch (err) {
//       console.error('Error sending OTP:', err);
//       alert('Failed to send OTP. Try again.');
//     }
//   }

//   onOtpInput(event: any, index: number) {
//     const input = event.target.value;
//     if (!/^\d$/.test(input)) {
//       this.otp[index] = '';
//       event.target.value = '';
//       return;
//     }

//     this.otp[index] = input;
//     if (input && index < this.otp.length - 1) {
//       this.otpInputs.get(index + 1)?.nativeElement.focus();
//     }
//   }

//   handleBackspace(event: KeyboardEvent, index: number) {
//     if (event.key === 'Backspace') {
//       if (!this.otp[index] && index > 0) {
//         this.otpInputs.get(index - 1)?.nativeElement.focus();
//       }
//       this.otp[index] = '';
//     }
//   }

//   async goToHome() {
//     if (!this.isOtpComplete()) {
//       alert('Please enter the complete 6-digit OTP.');
//       return;
//     }

//     const otpCode = this.otp.join('');
//     const fullPhone = `${this.countryCode}${this.phoneNumber}`;
//     const payload = {
//       phone: fullPhone,
//       otp: otpCode
//     };

//     try {
//       const res: any = await this.http.post('https://websocket-8rgr.onrender.com/api/verify-otp', payload).toPromise();
//       console.log('OTP verification response:', res);

//       if (res.status) {
//         alert('Login successful!');
//         this.router.navigateByUrl('/home-screen');
//       } else {
//         alert(res.message || 'Invalid OTP. Try again.');
//       }
//     } catch (err) {
//       console.error('OTP verification failed:', err);
//       alert('Failed to verify OTP. Try again.');
//     }
//   }
// }





import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage {
  phoneNumber = '';
  countryCode = '+91';
  showOtpPopup = false;
  otp: string[] = Array(6).fill('');
  countries = [
    { name: 'India', code: '+91' }, { name: 'USA', code: '+1' },
    { name: 'UK', code: '+44' }, { name: 'Australia', code: '+61' },
    { name: 'Canada', code: '+1' }, { name: 'Germany', code: '+49' },
    { name: 'France', code: '+33' }, { name: 'Brazil', code: '+55' },
    { name: 'South Africa', code: '+27' }, { name: 'Russia', code: '+7' },
    { name: 'China', code: '+86' }, { name: 'Japan', code: '+81' },
    { name: 'Singapore', code: '+65' }, { name: 'UAE', code: '+971' },
    { name: 'New Zealand', code: '+64' }, { name: 'Mexico', code: '+52' },
    { name: 'Italy', code: '+39' }, { name: 'Spain', code: '+34' },
    { name: 'Netherlands', code: '+31' }, { name: 'Sweden', code: '+46' }
  ];

  @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5') otpInputs!: QueryList<ElementRef>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'middle',
      color: 'dark'
    });
    toast.present();
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    if (!/^\d$/.test(event.key)) event.preventDefault();
  }

  isPhoneValid(): boolean {
    return /^\d{10}$/.test(this.phoneNumber.trim());
  }

  isOtpComplete(): boolean {
    return this.otp.every(d => d.trim().length === 1);
  }

  onCountryChange(event: any) {
    const selected = this.countries.find(c => c.name === event.target.value);
    if (selected) {
      this.countryCode = selected.code;
    }
  }

  async onAgreeClick() {
    this.phoneNumber = this.phoneNumber.trim();
    if (!this.isPhoneValid()) {
      this.showToast('Please enter a valid 10-digit mobile number.');
      return;
    }

    const fullPhone = `${this.countryCode}${this.phoneNumber}`;
    const payload = { phone: fullPhone };

    try {
      const res: any = await this.http.post('https://websocket-8rgr.onrender.com/api/send-otp', payload).toPromise();
      console.log('OTP sent response:', res);

      if (res.status) {
        this.showOtpPopup = true;
        localStorage.setItem("userId", this.phoneNumber);
      } else {
        this.showToast(res.message || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      this.showToast('Failed to send OTP. Try again.');
    }
  }

  onOtpInput(event: any, index: number) {
    const input = event.target.value;
    if (!/^\d$/.test(input)) {
      this.otp[index] = '';
      event.target.value = '';
      return;
    }

    this.otp[index] = input;
    if (input && index < this.otp.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  handleBackspace(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otp[index] && index > 0) {
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      }
      this.otp[index] = '';
    }
  }

  async goToHome() {
    if (!this.isOtpComplete()) {
      this.showToast('Please enter the complete 6-digit OTP.');
      return;
    }

    const otpCode = this.otp.join('');
    const fullPhone = `${this.countryCode}${this.phoneNumber}`;
    const payload = {
      phone: fullPhone,
      otp: otpCode
    };

    try {
      const res: any = await this.http.post('https://websocket-8rgr.onrender.com/api/verify-otp', payload).toPromise();
      console.log('OTP verification response:', res);

      if (res.status) {
        this.showToast('Login successful!');
        this.router.navigateByUrl('/home-screen');
      } else {
        this.showToast(res.message || 'Invalid OTP. Try again.');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      this.showToast('Failed to verify OTP. Try again.');
    }
  }
}
