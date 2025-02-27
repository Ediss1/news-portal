import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component'
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-news', component: AddNewsComponent, canActivate: [AuthGuard]},
  { path: 'news/:id', component: NewsDetailsComponent, canActivate: [AuthGuard] },
  { path: 'edit-news/:id', component: EditNewsComponent, canActivate: [AuthGuard] },
];
