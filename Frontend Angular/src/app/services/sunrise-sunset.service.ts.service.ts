// sunrise-sunset.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SunriseSunsetService {
  private apiUrl = 'https://api.sunrise-sunset.org/json';

  constructor(private http: HttpClient) {}

  getSunriseSunset(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${latitude}&lng=${longitude}`;
    return this.http.get<any>(url);
  }

  getSunriseSunsetByLocation(location: string): Observable<any> {
    const url = `${this.apiUrl}?q=${location}`;
    return this.http.get<any>(url);
  }
}
