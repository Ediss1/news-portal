import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';

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
    if (!this.isValidEmail(this.user.email)) {
      this.errorMessage = 'Nevažeći format e-pošte.';
      return;
    }

    this.api.register(this.user).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.successMessage = response.message || 'Registracija je uspjela!';
          this.errorMessage = '';

          const loginPayload = { username: this.user.username, password: this.user.password };
          this.api.login(loginPayload).subscribe({
            next: (loginResponse: any) => {
              if (loginResponse.success) {
                localStorage.setItem('user', JSON.stringify(loginResponse.user));
                this.successMessage = 'Prijava je uspjela!';
                this.errorMessage = '';
                this.router.navigate(['/']);
              } else {
                this.errorMessage = loginResponse.error || 'Prijava nije uspjela nakon registracije.';
              }
            },
            error: (loginError: any) => {
              console.error('Greška pri prijavi:', loginError);
              this.errorMessage = 'Prijava nakon registracije nije uspjela. Molimo prijavite se ručno.';
            },
          });
        } else {
          this.errorMessage = response.error || 'Registracija nije uspjela.';
        }
      },
      error: (error: any) => {
        console.error('Greška API zahtjeva:', error);
        this.errorMessage = error.error?.message || 'Registracija nije uspjela. Molimo pokušajte ponovo.';
        this.successMessage = '';
      },
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
