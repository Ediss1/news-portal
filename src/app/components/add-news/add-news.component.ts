import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { CommonModule } from '@angular/common'; // For *ngIf
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-news',
  standalone: true,
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddNewsComponent {
  news = { title: '', content: '', category: '' }; // Initialize the news object
  successMessage: string = ''; // Success message
  errorMessage: string = ''; // Error message
  categories: string[] = []; // Lista kategorija za dropdown
  isCustomCategory: boolean = false; // Flag za provjeru da li korisnik unosi novu kategoriju

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCategories(); // Dohvaćanje kategorija pri učitavanju komponente
  }

  loadCategories() {
    this.api.getCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.categories;
        } else {
          this.errorMessage = 'Failed to load categories.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching categories.';
        console.error('Category fetch error:', error);
      }
    );
  }

  toggleCustomCategory(event: any) {
    this.isCustomCategory = event.target.checked;
    if (this.isCustomCategory) {
      this.news.category = ''; // Clear the category if custom is selected
    }
  }

  addNews() {
    if (!this.news.title || !this.news.content || !this.news.category.trim()) {
      this.errorMessage = 'All fields are required.';
      return;
    }
  
    this.api.addNews(this.news).subscribe(
      (response: any) => {
        this.successMessage = 'News added successfully!';
        this.errorMessage = '';
        this.news = { title: '', content: '', category: '' }; // Reset forme
        this.isCustomCategory = false; // Reset custom category flag
      },
      (error) => {
        this.errorMessage = 'Failed to add news. Please try again.';
        console.error('Add news error:', error);
      }
    );
  }
  
}
