import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-news-details',
  standalone: true,
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
  imports:[CommonModule]
})
export class NewsDetailsComponent implements OnInit {
  news: any = null;
  isAdmin: boolean = false;
  errorMessage: string = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin';
    const newsId = this.route.snapshot.paramMap.get('id');
    if (newsId) {
      this.getNewsDetails(newsId);
    } else {
      this.errorMessage = 'Nevažeći ID vijesti.';
    }
  }

  getNewsDetails(id: string): void {
    this.api.getNewsDetails(id).subscribe(
      (response: any) => {
        this.news = response;
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = error.error?.message || 'Dohvaćanje detalja vijesti nije uspjelo.';
      }
    );
  }

  editNews(): void {
    this.router.navigate(['/edit-news', this.news.id]);
  }

  deleteNews(): void {
    if (confirm('Jeste li sigurni da želite izbrisati ovu vijest?')) {
      this.api.deleteNews(this.news.id).subscribe(
        (response: any) => {
          console.log('Obriši odgovor:', response);
          alert('Vijesti su uspješno izbrisane!');
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Greška prilikom brisanja vijesti:', error);
          alert(error.error?.message || 'Brisanje vijesti nije uspjelo.');
        }
      );
    }
  }
  
}
