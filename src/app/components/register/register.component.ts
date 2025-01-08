import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { CommonModule } from '@angular/common'; // For *ngIf
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class RegisterComponent {
  user = { name: '', surname: '', username: '', password: '', email: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    // Validate email format
    if (!this.isValidEmail(this.user.email)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    // Send registration request to API
    this.api.register(this.user).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.successMessage = response.message || 'Registration successful!';
          this.errorMessage = '';

          // Automatically log in after successful registration
          const loginPayload = { username: this.user.username, password: this.user.password };
          this.api.login(loginPayload).subscribe({
            next: (loginResponse: any) => {
              if (loginResponse.success) {
                localStorage.setItem('user', JSON.stringify(loginResponse.user));
                this.successMessage = 'Login successful!';
                this.errorMessage = '';
                this.router.navigate(['/']); // Redirect to home
              } else {
                this.errorMessage = loginResponse.error || 'Login failed after registration.';
              }
            },
            error: (loginError: any) => {
              console.error('Login error:', loginError);
              this.errorMessage = 'Failed to log in after registration. Please log in manually.';
            },
          });
        } else {
          this.errorMessage = response.error || 'Registration failed.';
        }
      },
      error: (error: any) => {
        console.error('API request error:', error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        this.successMessage = '';
      },
    });
  }

  // Email validation method
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
