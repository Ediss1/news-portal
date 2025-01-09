import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class HomeComponent {
  newsList: any[] = [];
  errorMessage: string = '';
  categories: string[] = [];
  selectedCategory: string = '';
  selectedDate: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadNews();
    this.loadCategories();
  }

  loadNews() {
    const filters = {
      category: this.selectedCategory,
      date: this.selectedDate,
    };
    this.api.getNews(filters).subscribe(
      (response: any) => {
        this.newsList = response.news || [];
        this.errorMessage = this.newsList.length ? '' : 'Nema dostupnih vijesti.';
      },
      (error: any) => {
        this.errorMessage = 'Učitavanje vijesti nije uspjelo. Molimo pokušajte ponovo kasnije.';
        console.error('Greška pri preuzimanju vijesti:', error);
      }
    );
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
      (error: any) => {
        console.error('Greška pri preuzimanju kategorija:', error);
        this.errorMessage = 'Došlo je do greške prilikom preuzimanja kategorija.';
      }
    );
  }

  applyFilters() {
    this.loadNews();
  }

  viewDetails(newsId: number) {
    this.router.navigate(['/news', newsId]);
  }
}
