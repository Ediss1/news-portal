import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // For *ngIf
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
  isAdmin: boolean = false; // Property to check admin status
  errorMessage: string = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve user from localStorage
    this.isAdmin = user.role === 'admin'; // Check if the user is an admin
    const newsId = this.route.snapshot.paramMap.get('id'); // Get ID from route
    if (newsId) {
      this.getNewsDetails(newsId);
    } else {
      this.errorMessage = 'Invalid news ID.';
    }
  }

  getNewsDetails(id: string): void {
    this.api.getNewsDetails(id).subscribe(
      (response: any) => {
        this.news = response;
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = error.error?.message || 'Failed to fetch news details.';
      }
    );
  }

  editNews(): void {
    // Navigate to the edit page
    this.router.navigate(['/edit-news', this.news.id]);
  }

  deleteNews(): void {
    if (confirm('Are you sure you want to delete this news item?')) {
      this.api.deleteNews(this.news.id).subscribe(
        (response: any) => {
          console.log('Delete response:', response);
          alert('News deleted successfully!');
          this.router.navigate(['/']); // Redirect to home after deletion
        },
        (error: any) => {
          console.error('Error deleting news:', error);
          alert(error.error?.message || 'Failed to delete news.');
        }
      );
    }
  }
  
}
