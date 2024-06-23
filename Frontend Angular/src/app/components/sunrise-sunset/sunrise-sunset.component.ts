import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenCageService } from '../../services/open-cage.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sunrise-sunset',
  templateUrl: './sunrise-sunset.component.html',
  styleUrls: ['./sunrise-sunset.component.css']
})
export class SunriseSunsetComponent implements OnInit {
  sunriseSunsetData: any;
  location: string = ''; // User input location
  latitude!: number;
  longitude!: number;
  timezone!: string;
  apiEndpoint: string = 'https://api.sunrise-sunset.org/json';
  message: string = '';
 
  constructor(private http: HttpClient, private openCageService: OpenCageService,  private router: Router, ) { }

  ngOnInit(): void {
    this.getSunriseSunsetDataByLocation('Delhi'); // Default location
  }

  getSunriseSunsetData() {
    if (!this.latitude || !this.longitude) {
      this.message = 'Latitude and Longitude are required';
      return;
    }
    const url = `${this.apiEndpoint}?lat=${this.latitude}&lng=${this.longitude}&formatted=0`;
    this.http.get<any>(url).subscribe(
      (data) => {
        console.log('Sunrise Sunset Data:', data);
        this.sunriseSunsetData = data;
        this.convertTimesToLocal();
        this.message = ''; // Clear message on successful fetch
      },
      (error) => {
        console.error('Error fetching sunrise-sunset data', error);
        this.message = 'Failed to fetch sunrise and sunset data. Please try again.';
      }
    );
  }

  getSunriseSunsetDataByLocation(location: string) {
    this.openCageService.getLocation(location).subscribe(
      (data) => {
        if (data.results && data.results.length > 0) {
          this.latitude = data.results[0].geometry.lat;
          this.longitude = data.results[0].geometry.lng;
          this.timezone = data.results[0].annotations.timezone.name; // Fetch timezone
          this.getSunriseSunsetData();
        } else {
          console.error('No results found for the location');
          this.message = 'No results found for the specified location.';
        }
      },
      (error) => {
        console.error('Error fetching location data', error);
        this.message = 'Failed to fetch location data. Please try again.';
      }
    );
  }

  convertTimesToLocal() {
    if (this.sunriseSunsetData && this.timezone) {
      const formatTime = (time: string) => {
        return moment.utc(time).tz(this.timezone).format('h:mm:ss A');
      };

      this.sunriseSunsetData.results.sunrise = formatTime(this.sunriseSunsetData.results.sunrise);
      this.sunriseSunsetData.results.sunset = formatTime(this.sunriseSunsetData.results.sunset);
      this.sunriseSunsetData.results.solar_noon = formatTime(this.sunriseSunsetData.results.solar_noon);
      this.sunriseSunsetData.results.civil_twilight_begin = formatTime(this.sunriseSunsetData.results.civil_twilight_begin);
      this.sunriseSunsetData.results.civil_twilight_end = formatTime(this.sunriseSunsetData.results.civil_twilight_end);
    }
  }

  onSubmit() {
    if (this.location.trim() === '') {
      this.message = 'Please enter a location';
      return;
    }

    this.getSunriseSunsetDataByLocation(this.location);
  }

  closeCard() {
    // Add any logic here to handle closing the card, e.g., resetting data or hiding the card
    this.sunriseSunsetData = null; // Reset the data
  }

  goBack() {
    this.router.navigate(['/weather']);
  }
}
