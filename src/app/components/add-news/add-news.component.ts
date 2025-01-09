import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-news',
  standalone: true,
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddNewsComponent {
  news = { title: '', content: '', category: '' };
  successMessage: string = '';
  errorMessage: string = '';
  categories: string[] = [];
  isCustomCategory: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.categories;
        } else {
          this.errorMessage = 'Greška pri učitavanju kategorija.';
        }
      },
      (error) => {
        this.errorMessage = 'Došlo je do greške prilikom preuzimanja kategorija.';
        console.error('Greška pri preuzimanju kategorije:', error);
      }
    );
  }

  toggleCustomCategory(event: any) {
    this.isCustomCategory = event.target.checked;
    if (this.isCustomCategory) {
      this.news.category = '';
    }
  }

  addNews() {
    if (!this.news.title || !this.news.content || !this.news.category.trim()) {
      this.errorMessage = 'Sva polja su obavezna.';
      return;
    }
  
    this.api.addNews(this.news).subscribe(
      (response: any) => {
        this.successMessage = 'Vijesti su uspješno dodane!';
        this.errorMessage = '';
        this.news = { title: '', content: '', category: '' };
        this.isCustomCategory = false;
      },
      (error) => {
        this.errorMessage = 'Dodavanje vijesti nije uspjelo. Molimo pokušajte ponovo.';
        console.error('Greška u dodavanju vijesti:', error);
      }
    );
  }
  
}
