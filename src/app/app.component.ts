import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'BookAppFrontend';
  isDarkMode = false; 

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode; 
    const theme = this.isDarkMode ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-bs-theme', theme);
    
    localStorage.setItem('theme', theme); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}