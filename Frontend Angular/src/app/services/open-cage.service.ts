import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenCageService {
  private apiKey = 'da560fc153524154ad39b362b1e7aad8';
  private apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(private http: HttpClient) {}

  getLocation(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getLocationImage(lat: number, lng: number) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${this.apiKey}&pretty=1&no_annotations=1&language=en`;
    return this.http.get(url);
  }
}
