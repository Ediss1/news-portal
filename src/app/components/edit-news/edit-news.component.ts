import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
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
  news = { title: '', content: '', category: '' }; // Form model for editing
  errorMessage: string = '';
  successMessage: string = '';
  newsId: string | null = null;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id'); // Get the news ID from the route
    if (this.newsId) {
      this.loadNewsDetails(this.newsId);
    } else {
      this.errorMessage = 'Invalid news ID.';
    }
  }

  loadNewsDetails(id: string): void {
    this.api.getNewsDetails(id).subscribe(
      (response: any) => {
        this.news = response;
      },
      (error: any) => {
        console.error('Error fetching news details:', error);
        this.errorMessage = error.error?.message || 'Failed to load news details.';
      }
    );
  }

  updateNews(): void {
    if (this.newsId) {
      this.api.updateNews(this.newsId, this.news).subscribe(
        (response: any) => {
          console.log('Update response:', response); // Log the response
          this.successMessage = response.message || 'News updated successfully!';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/news', this.newsId]); // Navigate to news details
          }, 2000);
        },
        (error: any) => {
          console.error('Update error:', error);
          this.errorMessage = error.error?.message || 'Failed to update news.';
          this.successMessage = '';
        }
      );
    }
  }
  
}
