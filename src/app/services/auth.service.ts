import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login() {
    localStorage.setItem('ownerLoggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('ownerLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('ownerLoggedIn') === 'true';
  }
}
