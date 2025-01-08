import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule], // Ensure Router is imported
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.isLoggedIn = true;
      this.isAdmin = parsedUser.role === 'admin';
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['welcome']); // Navigate to Welcome Page
  }

  goToHome(): void {
    console.log('Navigating to Home');
    this.router.navigate(['/']);
  }

  goToAddNews(): void {
    if (this.isAdmin) {
      this.router.navigate(['/add-news']);
    } else {
      alert('You do not have permission to access this page.');
      this.router.navigate(['/']);
    }
  }
}
