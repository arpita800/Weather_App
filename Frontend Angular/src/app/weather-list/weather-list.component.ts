
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface WeatherData {
  email: string;
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.css'
})
export class WeatherListComponent {

  weatherData: WeatherData[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    this.getWeatherData();
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
        },
        (error) => {
          console.error('Error fetching weather data', error);
        }
      );
  }
}
