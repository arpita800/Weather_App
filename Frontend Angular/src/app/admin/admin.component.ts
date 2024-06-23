import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js/auto';

interface WeatherData {
  email: string;
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

interface Feedback {
  email: string;
  feedback1: string; // Adjust based on your actual structure
  rating: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  weatherData: WeatherData[] = [];
  feedbacks: Feedback[] = [];
  weatherChart: any;
  
  // Counts for poor, average, good ratings
  poorCount: number = 0;
  averageCount: number = 0;
  goodCount: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
    this.getWeatherData();
    this.getFeedbacks();
  }

  getUsers(): void {
    this.http.get<any[]>('https://localhost:7090/api/User')
      .subscribe(
        (response) => {
          this.users = response;
          console.log('Users fetched successfully', this.users);
        },
        (error) => {
          console.error('Error fetching users', error);
        }
      );
  }

  getWeatherData(): void {
    this.http.get<any[]>('https://localhost:7090/api/WeatherDatums')
      .subscribe(
        (response: any[]) => {
          // Assuming 'response' is an array from API
          this.weatherData = response.map(item => ({
            email: item.email,
            location: item.location,
            temperature: parseFloat(item.temperature), // Assuming temperature is numeric
            humidity: parseFloat(item.humidity), // Assuming humidity is numeric
            windSpeed: parseFloat(item.windSpeed) // Assuming windSpeed is numeric
          }));
          console.log('Weather data fetched successfully', this.weatherData);
          this.createWeatherChart();
        },
        (error) => {
          console.error('Error fetching weather data', error);
        }
      );
  }

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

          // Calculate counts for poor, average, good ratings
          this.poorCount = this.feedbacks.filter(feedback => feedback.rating >= 1 && feedback.rating <= 2).length;
          this.averageCount = this.feedbacks.filter(feedback => feedback.rating >= 3 && feedback.rating <= 4).length;
          this.goodCount = this.feedbacks.filter(feedback => feedback.rating === 5).length;

          // Optionally, create feedback chart here if needed
          // this.createFeedbackChart();
        },
        (error) => {
          console.error('Error fetching feedbacks', error);
        }
      );
  }


  logout() {
    this.router.navigate(['/home']);
    Swal.fire({
      icon: 'success',
      title: 'Logged Out Successfully',
      showConfirmButton: false,
      timer: 1500
    });
  }

  createWeatherChart(): void {
    const labels = this.weatherData.map(data => data.location);
    const temperatures = this.weatherData.map(data => data.temperature);

    const ctxWeather = document.getElementById('weatherChart') as HTMLCanvasElement;
    if (ctxWeather) {
      this.weatherChart = new Chart(ctxWeather, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Temperature',
            data: temperatures,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      console.log('Weather chart created successfully');
    } else {
      console.error('Weather canvas element not found');
    }
  }

}
