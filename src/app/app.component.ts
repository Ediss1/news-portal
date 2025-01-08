import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // For *ngIf
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { HeaderComponent } from './components/header/header.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule, HeaderComponent], // Import RouterModule here

})

export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private api: ApiService) {}
  
  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user; // Update login status
  }

  logout() {
    this.api.logout().subscribe(
      (response: any) => {
        console.log(response.message);
        localStorage.removeItem('user'); // Clear user data from localStorage
        this.isLoggedIn = false; // Update login state
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error: any) => {
        console.error('Logout failed:', error);
      }
    );
  }
  
}
