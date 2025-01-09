import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-news',
  standalone: true,
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
  imports:[CommonModule, FormsModule],

})
export class EditNewsComponent implements OnInit {
  news = { title: '', content: '', category: '' };
  errorMessage: string = '';
  successMessage: string = '';
  categories: string[] = [];
  newsId: string | null = null;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id');
    if (this.newsId) {
      this.loadNewsDetails(this.newsId);
      this.loadCategories();
    } else {
      this.errorMessage = 'Nevažeći ID vijesti.';
    }
  }

  loadCategories() {
    this.api.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.categories;
        } else {
          this.errorMessage = 'Učitavanje kategorija nije uspjelo.';
        }
      },
      (error) => {
        this.errorMessage = 'Došlo je do greške prilikom preuzimanja kategorija.';
        console.error('Greška pri preuzimanju kategorije:', error);
      }
    );
  }

  loadNewsDetails(id: string): void {
    this.api.getNewsDetails(id).subscribe(
      (response: any) => {
        this.news = response;
      },
      (error: any) => {
        console.error('Greška pri preuzimanju detalja vijesti:', error);
        this.errorMessage = error.error?.message || 'Učitavanje detalja vijesti nije uspjelo.';
      }
    );
  }

  updateNews(): void {
    if (this.newsId) {
      this.api.updateNews(this.newsId, this.news).subscribe(
        (response: any) => {
          console.log('Ažuriranje odgovor:', response);
          this.successMessage = response.message || 'Vijesti su uspješno ažurirane!';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/news', this.newsId]);
          }, 2000);
        },
        (error: any) => {
          console.error('Greška pri ažuriranju:', error);
          this.errorMessage = error.error?.message || 'Ažuriranje vijesti nije uspjelo.';
          this.successMessage = '';
        }
      );
    }
  }
  
}
