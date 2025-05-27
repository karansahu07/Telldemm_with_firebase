import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
})
export class ProfileSetupPage {
  name: string = '';
  imageData: string | ArrayBuffer | null = null;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

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

  async onSubmit() {
    if (!this.name.trim()) {
      const toast = await this.toastController.create({
        message: 'Please enter your name',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    // Optionally, save to localStorage or call API
    localStorage.setItem('profileName', this.name);
    if (this.imageData) {
      localStorage.setItem('profileImage', this.imageData.toString());
    }

    this.router.navigateByUrl('/home-screen');
  }
}
