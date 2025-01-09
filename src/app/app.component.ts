import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule, HeaderComponent],

})

export class AppComponent {
  
  isLoggedIn: boolean = false;

  constructor(private router: Router, private api: ApiService) {}
  
  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
  }

  logout() {
    this.api.logout().subscribe(
      (response: any) => {
        console.log(response.message);
        localStorage.removeItem('user');
        this.isLoggedIn = false;
        this.router.navigate(['/login']); 
      },
      (error: any) => {
        console.error('Logout failed:', error);
      }
    );
  }
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
