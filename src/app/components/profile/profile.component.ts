import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProfileComponent {
  user: any = { name: '', surname: '', username: '', email: '' };
  successMessage: string = '';
  errorMessage: string = '';

  passwordData: any = {
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  };
  isChangingPassword: boolean = false;
  passwordSuccessMessage: string = '';
  passwordErrorMessage: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.api.getUserProfile().subscribe(
      (response: any) => {
        if (response.success) {
          this.user = response.user;
        } else {
          this.errorMessage = response.error || 'Učitavanje profila nije uspjelo.';
        }
      },
      (error: any) => {
        console.error('Greška pri učitavanju profila:', error);
        this.errorMessage = 'Došlo je do greške prilikom učitavanja profila.';
      }
    );
  }

  updateProfile() {
    this.api.updateUserProfile(this.user).subscribe(
      (response: any) => {
        if (response.success) {
          this.successMessage = response.message || 'Profil je uspješno ažuriran.';
          this.errorMessage = '';
        } else {
          this.errorMessage = response.error || 'Ažuriranje profila nije uspjelo.';
        }
      },
      (error: any) => {
        console.error('Greška pri ažuriranju profila:', error);
        this.errorMessage = 'Došlo je do greške prilikom ažuriranja profila.';
      }
    );
  }

  toggleChangePassword() {
    this.isChangingPassword = !this.isChangingPassword;
  }

  changePassword() {
    this.api.changePassword(this.passwordData).subscribe(
      (response: any) => {
        if (response.success) {
          this.passwordSuccessMessage = response.message || 'Lozinka je uspješno promijenjena.';
          this.passwordErrorMessage = '';
          this.passwordData = { currentPassword: '', newPassword: '', repeatPassword: '' };
        } else {
          this.passwordErrorMessage = response.error || 'Promjena lozinke nije uspjela.';
        }
      },
      (error: any) => {
        console.error('Greška pri promjeni lozinke:', error);
        this.passwordErrorMessage = 'Došlo je do greške prilikom promjene lozinke.';
      }
    );
  }
}
