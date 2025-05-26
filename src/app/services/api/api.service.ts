import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

 
  post(url: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, payload);
  }

  /**
   * Send OTP to user
   * @param phone_number 
   */
  sendOtp(phone_number: string): Observable<any> {
    return this.post('/send-otp', { phone_number });
  }

  /**
   * Verify OTP
   * @param phone_number 
   * @param otp_code 
   */
  verifyOtp(phone_number: string, otp_code: string): Observable<any> {
    return this.post('/verify-otp', { phone_number, otp_code });
  }
}
