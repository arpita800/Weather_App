import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OpenWeatherService } from '../services/open-weather.service';
import { OpenCageService } from '../services/open-cage.service';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

declare let L: any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapContainer!: ElementRef;
  map: any;
  location: string = 'Bangalore';
  temp: any;
  weatherData: any = null;
  isPlatformBrowser: boolean;
  forecastData!: any[];
  errorMessage: string = '';
  alertMessage: string = '';
  alertIcon: string = '';
  favorites: string[] = [];
  sidebarOpen = false;
  locationImage: string = '';

  constructor(
  private http: HttpClient,
    private router: Router,
    private openWeatherService: OpenWeatherService,
    private openCageService: OpenCageService,
    private favoritesService: FavoritesService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if(!localStorage.getItem("uid")) {
      this.router.navigateByUrl("/login");
    }
    if (this.isPlatformBrowser) {
      this.favorites = this.favoritesService.getFavorites();
      this.loadMap(); 
    }
  }

  ngAfterViewInit() {
    if (this.isPlatformBrowser) {
      this.loadMap();
    }
  }

  toggleSidebar() {
    this.sidebarOpen =!this.sidebarOpen;
  }
  
  loadMap() {
    if (this.isPlatformBrowser) {
      import('leaflet').then((module) => {
        const L = module.default;

        this.map = L.map(this.mapContainer.nativeElement).setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
      }).catch(error => {
        console.error('Error loading Leaflet', error);
      });
    }
  }

  getWeather() {
    if (this.location.trim() === '') {
      return;
    }

    this.openCageService.getLocation(this.location).subscribe(
      (data: any) => {
        const lat = data.results[0].geometry.lat;
        const lon = data.results[0].geometry.lng;

        

        this.openWeatherService.getWeather(lat, lon).subscribe(
          (weather: any) => {
            this.weatherData = weather;

            // Check weather conditions and set alert message
            this.setAlertMessage(weather);

            if (this.isPlatformBrowser && this.map) {
              this.map.setView([lat, lon], 10);

              this.map.eachLayer((layer: any) => {
                if (layer instanceof L.Marker) {
                  this.map.removeLayer(layer);
                }
              });

              const marker = L.marker([lat, lon]).addTo(this.map);
              marker.bindPopup(`<b>${this.location}</b><br>${weather.main.temp}°C`).openPopup();
            }
          },
          (error: any) => {
            console.error('Error fetching weather data', error);
          }
        );

        this.openWeatherService.getWeatherForecast(lat, lon).subscribe(
          (forecast: any) => {
            // Filter the forecast data for the next 5 days (assuming 8 values per day)
            this.forecastData = forecast.list.filter((value: any, index: number) => index % 8 === 0).slice(0, 5);
          },
          (error: any) => {
            console.error('Error fetching weather forecast', error);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching location data', error);
      }
    );
  }

  setAlertMessage(weather: any): void {
    if (weather.main.temp > 30) {
      this.alertMessage = 'It\'s too sunny! Make sure to use sunscreen.';
      this.alertIcon = 'wb_sunny';
    } else if (weather.wind.speed > 10) {
      this.alertMessage = 'It\'s too windy! Be careful when going outside.';
      this.alertIcon = 'cloud';
    } else if (weather.weather[0].main === 'Rain' || weather.weather[0].main === 'Drizzle') {
      this.alertMessage = 'It\'s raining! Don\'t forget your umbrella.';
      this.alertIcon = 'umbrella';
    } else {
      this.alertMessage = ''; // Clear the alert message if none of the conditions match
      this.alertIcon = '';
    }
  }

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  onSubmit(): void {
    if (this.location.trim() === '') {
      return;
    }
    this.getWeather();
    this.savedata();
  }

  getDateFromTimestamp(timestamp: number): Date {
    return new Date(timestamp * 1000); // Convert UNIX timestamp to JavaScript Date object
  }


  savedata(){

    {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('email is not available in local storage.');
        return;
      }
    
    const weatherDataToSave = {
      email: email,
     Location : this.location,
      Temperature: this.weatherData.main.temp,
      Humidity: this.weatherData.main.humidity,
      WindSpeed: this.weatherData.wind.speed,
    };
  
    this.http.post('https://localhost:7090/api/WeatherDatums', weatherDataToSave)
    .subscribe(
      (response) => {
        console.log('Fetching:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Weather data fetched successfully',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      },
      (error) => {
        console.error('Error saving weather data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to save weather data',
          showConfirmButton: true
        });
      }
    );
    }
  }

  getAlertIcon(icon: string): string {
    switch (icon) {
      case 'wb_sunny':
        return 'wb_sunny';
      case 'cloud':
        return 'cloud';
      case 'umbrella':
        return 'umbrella';
      default:
        return '';
    }
  }

  goToSunriseSunsetPage(): void {
    this.router.navigate(['/sunrise-sunset']);
  }

  addFavorite(): void {
    if (this.location.trim() !== '' && !this.favoritesService.isFavorite(this.location)) {
      this.favoritesService.addFavorite(this.location);
      this.favorites = this.favoritesService.getFavorites();
    }
  }

  removeFavorite(location: string): void {
    this.favoritesService.removeFavorite(location);
    this.favorites = this.favoritesService.getFavorites();
  }

  loadFavorite(location: string): void {
    this.location = location;
    this.getWeather();
  }

  isFavorite(location: string): boolean {
    return this.favoritesService.isFavorite(location);
  }

  logout() {
    // Perform logout actions here (e.g., clear local storage, reset session, etc.)
    // For demonstration purposes, we're just navigating to the home component
    this.router.navigate(['/home']);

    // Show SweetAlert2 alert
    Swal.fire({
      icon: 'success',
      title: 'Logged Out Successfully',
      showConfirmButton: false,
      timer: 1500
    });
  }

}
