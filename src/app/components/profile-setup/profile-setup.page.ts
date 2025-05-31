import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // adjust path as needed

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
})
export class ProfileSetupPage implements OnInit {
  name: string = '';
  imageData: string | ArrayBuffer | null = null;
  phoneNumber: string = '';

  maxLength = 25;
  inputText = '';
  remainingCount = this.maxLength;
  isSubmitting: boolean = false;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const storedPhone = localStorage.getItem('phone_number');
    if (storedPhone) {
      this.phoneNumber = storedPhone;
    } else {
      this.showToast('Phone number is missing, please login again.', 'danger');
      this.router.navigateByUrl('/login-screen');
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onInputChange(event: any) {
    const value = event.target.value;
    this.inputText = value.length > this.maxLength ? value.slice(0, this.maxLength) : value;
    this.remainingCount = this.maxLength - this.inputText.length;
  }

  async showToast(message: string, color: 'danger' | 'success' | 'dark' = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  async onSubmit() {
  if (!this.name.trim()) {
    this.showToast('Please enter your name', 'danger');
    return;
  }

  this.isSubmitting = true; 

  const payload = {
    phone_number: this.phoneNumber,
    name: this.name,
    profile_picture: this.imageData ? this.imageData.toString() : null,
  };

  this.http.post(`${environment.apiBaseUrl}/api/users`, payload).subscribe({
    next: async () => {
      localStorage.setItem('name', this.name);
       // this.showToast('Profile saved successfully!', 'success');
      if (this.imageData) {
        localStorage.setItem('profile_url', this.imageData.toString());
      }

      this.router.navigateByUrl('/home-screen');
    },
    error: async (err) => {
      console.error(err);
      // this.showToast('Failed to save profile. Please try again.', 'danger');
    },
    complete: () => {
      this.isSubmitting = false; 
    }
  });
}

}