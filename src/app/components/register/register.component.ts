import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { username: '', password: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Konto skapat! Du kan nu logga in.';
        this.errorMessage = '';
        this.user = { username: '', password: '' }; 
      },
      error: () => {
        this.errorMessage = 'Användarnamnet är redan upptaget eller något gick fel.';
        this.successMessage = '';
      }
    });
  }
}