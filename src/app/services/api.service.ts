import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost/news-portal-api';

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post('http://localhost/news-portal-api/register.php', user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost/news-portal-api/login.php', credentials, {
      withCredentials: true,
    });
  }
  
  
  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/logout.php`, {}, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getCategories() {
    return this.http.get('http://localhost/news-portal-api/fetch_categories.php');
  }
  
  getNews(filters: { category?: string; date?: string } = {}) {
    let params = new URLSearchParams();
    if (filters.category) {
      params.append('category', filters.category);
    }
    if (filters.date) {
      params.append('date', filters.date);
    }
    return this.http.get(`http://localhost/news-portal-api/fetch_news.php?${params.toString()}`);
  }
  

  addNews(news: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/add_news.php`, news, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getNewsDetails(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/get_news_details.php?id=${id}`, {
      withCredentials: true,
    });
  }
  
  deleteNews(newsId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete_news.php?id=${newsId}`, {
      withCredentials: true,
    });
  }
  
  updateNews(id: string, news: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/update_news.php?id=${id}`, news, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUserProfile() {
    return this.http.get('http://localhost/news-portal-api/get_user_profile.php', {
      withCredentials: true, // Ensure the session is included
    });
  }
  
  updateUserProfile(user: { name: string; surname: string; email: string }) {
    return this.http.post('http://localhost/news-portal-api/update_user_profile.php', user, {
      withCredentials: true, // Ensure the session is included
    });
  }
  
  changePassword(passwordData: any) {
    return this.http.post('http://localhost/news-portal-api/change_password.php', passwordData, {
      withCredentials: true, // Ensure session is included
    });
  }
  
  
}
