
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-owner-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-login.component.html',
  styleUrl: './owner-login.component.css'
})
export class OwnerLoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.api.ownerLogin({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.auth.login();
        this.router.navigate(['/owner/orders']);
      },
      error: () => {
        this.error = 'Invalid credentials';
      }
    });
  }
}
