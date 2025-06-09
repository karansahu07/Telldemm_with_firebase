import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['/auth/login']);
//       return false;
//     }
//   }
canActivate(): boolean {
  const isLoggedIn = !!localStorage.getItem('userId');
  if (!isLoggedIn) {
    this.router.navigate(['/login-screen']);
    return false;
  }
  return true;
}

}



// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   async canActivate(): Promise<boolean> {
//     const isLoggedIn = await this.authService.isLoggedIn();
//     if (!isLoggedIn) {
//       this.router.navigate(['/login-screen']);
//       return false;
//     }
//     return true;
//   }
// }
