import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedback: any = {
    feedback1: '',
    rating: 0
  };

  constructor(private http: HttpClient, private router: Router) { }

  submitFeedback(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('Email is not available in local storage.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email is required to submit feedback. Please log in.',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    // Add the email to the feedback object
    const feedbackData = {
      ...this.feedback,
      email: email
    };

    this.http.post<any>('https://localhost:7090/api/Feedbacks', feedbackData)
      .subscribe(
        (response) => {
          console.log('Feedback submitted successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Feedback Submitted',
            text: 'Thank you for your feedback!',
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            Swal.fire({
              title: 'What would you like to do next?',
              showCancelButton: true,
              confirmButtonText: 'Continue Browsing',
              cancelButtonText: 'Log Out',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/weather']);  // Navigate to weather component
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                localStorage.removeItem('email');   // Log out action (e.g., clearing local storage)
                this.router.navigate(['/home']);    // Navigate to home page
              }
            });
          });
          // Reset form after successful submission
          this.feedback = {
            feedback1: '',
            rating: 0
          };
        },
        (error) => {
          console.error('Error submitting feedback', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
            timer: 3000,
            showConfirmButton: false
          });
        }
      );
  }
}
