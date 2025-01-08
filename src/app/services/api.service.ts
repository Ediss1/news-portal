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
      withCredentials: true, // Include credentials for session management
    });
  }
  
  
  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/logout.php`, {}, {
      withCredentials: true, // Send session cookies
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
      withCredentials: true, // Include cookies for session handling
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getNewsDetails(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/get_news_details.php?id=${id}`, {
      withCredentials: true, // Include credentials for session management
    });
  }
  
  deleteNews(newsId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete_news.php?id=${newsId}`, {
      withCredentials: true, // Include session credentials
    });
  }
  
  updateNews(id: string, news: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/update_news.php?id=${id}`, news, {
      withCredentials: true, // Include credentials
      headers: { 'Content-Type': 'application/json' }, // Set content type
    });
  }
  
  
  
  
  
  
}
