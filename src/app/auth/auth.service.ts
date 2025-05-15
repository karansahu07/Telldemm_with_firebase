import { Injectable } from '@angular/core';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private recaptchaVerifier!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;

  initRecaptcha(containerId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.recaptchaVerifier) {
        this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
          size: 'invisible',
          callback: (response: any) => {
            console.log('reCAPTCHA solved');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  sendOTP(phone: string): Promise<void> {
    if (!this.recaptchaVerifier) {
      return Promise.reject(new Error('Recaptcha not initialized'));
    }
    return signInWithPhoneNumber(this.auth, phone, this.recaptchaVerifier)
      .then(confirmationResult => {
        this.confirmationResult = confirmationResult;
        console.log('OTP sent successfully');
      })
      .catch(err => {
        console.error('Firebase OTP error:', err);
        throw err;
      });
  }

  verifyOTP(code: string) {
    return this.confirmationResult.confirm(code);
  }
}

