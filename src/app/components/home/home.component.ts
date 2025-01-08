import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { CommonModule } from '@angular/common'; // For *ngIf
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, CommonModule, RouterModule], // Import CommonModule
})
export class HomeComponent {
  newsList: any[] = [];
  errorMessage: string = '';
  categories: string[] = []; // Example categories
  selectedCategory: string = ''; // For category filter
  selectedDate: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadNews(); // Load all news on component initialization
    this.loadCategories(); // Load available categories for filtering
  }

  loadNews() {
    const filters = {
      category: this.selectedCategory,
      date: this.selectedDate,
    };
    this.api.getNews(filters).subscribe(
      (response: any) => {
        this.newsList = response.news || [];
        this.errorMessage = this.newsList.length ? '' : 'No news available.';
      },
      (error: any) => {
        this.errorMessage = 'Failed to load news. Please try again later.';
        console.error('Error fetching news:', error);
      }
    );
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
      (error: any) => {
        console.error('Error fetching categories:', error);
        this.errorMessage = 'An error occurred while fetching categories.';
      }
    );
  }

  applyFilters() {
    this.loadNews();
  }

  viewDetails(newsId: number) {
    this.router.navigate(['/news', newsId]); // Navigate to the News Details page
  }
}
