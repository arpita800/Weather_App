import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  private apiKey = '53301e7d5f33bd18b5954d6d8149973c';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }


  getWeatherForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getWeatherByLocation(location: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${location}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getWeatherForecastByLocation(location: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${location}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }
  
}
