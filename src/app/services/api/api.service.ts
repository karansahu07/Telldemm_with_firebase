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
   * @param phone 
   */
  sendOtp(phone: string): Observable<any> {
    return this.post('/send-otp', { phone });
  }

  /**
   * Verify OTP
   * @param phone 
   * @param otp 
   */
  verifyOtp(phone: string, otp: string): Observable<any> {
    return this.post('/verify-otp', { phone, otp });
  }
}
