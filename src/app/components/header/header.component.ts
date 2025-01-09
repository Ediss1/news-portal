import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
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
    this.router.navigate(['welcome']);
  }

  goToHome(): void {
    console.log('Navigacija do početne stranice');
    this.router.navigate(['/']);
  }

  goToAddNews(): void {
    if (this.isAdmin) {
      this.router.navigate(['/add-news']);
    } else {
      alert('Nemate dozvolu za pristup ovoj stranici.');
      this.router.navigate(['/']);
    }
  }
}
