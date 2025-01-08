import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user'); // Check if user data exists in localStorage
    if (user) {
      return true; // Allow access
    } else {
      this.router.navigate(['/welcome']); // Redirect to login if not logged in
      return false; // Deny access
    }
  }
}
