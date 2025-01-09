import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private api: ApiService, private router: Router) {}
  
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/']);
    }
  }

  login(event: Event): void {
    event.preventDefault();
  
    const { username, password } = this.credentials;
  
    if (!username.trim() || !password.trim()) {
      this.errorMessage = 'Korisničko ime i lozinka su obavezni.';
      return;
    }
  
    const payload = {
      username: username.trim(),
      password: password.trim(),
    };
  
    this.api.login({ username: username.trim(), password: password.trim() }).subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.errorMessage = '';
          window.location.reload();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.error || 'Nevažeći podaci za prijavu.';
        }
      },
      (error: any) => {
        this.errorMessage = 'Došlo je do neočekivane greške. Molimo pokušajte ponovo kasnije.';
        console.error('Greška pri prijavi:', error);
      }
    );
  }
}
