import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { CommonModule } from '@angular/common'; // For *ngIf
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})

export class LoginComponent implements OnInit{
  credentials = { username: '', password: '' };
  errorMessage: string = ''; // To display error messages
  successMessage: string = ''; // To display success messages

  constructor(private api: ApiService, private router: Router) {}
  
  ngOnInit(): void { // Correctly define the ngOnInit method
    const user = localStorage.getItem('user'); // Check if user is already logged in
    if (user) {
      this.router.navigate(['/']); // Redirect to home if logged in
    }
  }

  login(event: Event): void {
    event.preventDefault(); // Prevent default form submission
  
    const { username, password } = this.credentials;
  
    // Frontend validation for empty fields
    if (!username.trim() || !password.trim()) {
      this.errorMessage = 'Username and password are required.';
      return;
    }
  
    // Prepare payload for the API
    const payload = {
      username: username.trim(),
      password: password.trim(),
    };
  
    // Call the API
    this.api.login({ username: username.trim(), password: password.trim() }).subscribe(
      (response: any) => {
        if (response.success) {
          // Store user data and navigate to home
          localStorage.setItem('user', JSON.stringify(response.user));
          this.errorMessage = ''; // Clear any existing errors
          window.location.reload();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.error || 'Invalid login credentials.';
        }
      },
      (error: any) => {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
        console.error('Login error:', error);
      }
    );
  }
}
