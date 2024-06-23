import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



interface Feedback {
  email: string;
  feedback1: string; // Adjust based on your actual structure
  rating: number;
}


@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {
  feedbacks: Feedback[] = [];

  ngOnInit(): void {
    this.getFeedbacks();
  }

  constructor(private http: HttpClient, private router: Router) {}

  getFeedbacks(): void {
    this.http.get<any[]>('https://localhost:7090/api/Feedbacks')
      .subscribe(
        (response: any[]) => {
          // Assuming 'response' is an array from API
          this.feedbacks = response.map(item => ({
            email: item.email,
            feedback1: item.feedback1, // Adjust based on your actual structure
            rating: parseInt(item.rating) // Assuming rating is numeric
          }));
          console.log('Feedbacks fetched successfully', this.feedbacks);
        },
        (error) => {
          console.error('Error fetching feedbacks', error);
        }
      );
  }

}
