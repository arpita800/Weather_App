import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { OpenWeatherService } from '../../services/open-weather.service';
import { OpenCageService } from '../../services/open-cage.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: string[] = [];
  favoriteData: { [location: string]: any } = {};
  showFavoriteDetails: { [location: string]: boolean } = {};
  location: any;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService,
    private openWeatherService: OpenWeatherService,
    private openCageService: OpenCageService
  ) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
    this.loadFavoritesWeather();
  }

  goBack() {
    this.router.navigate(['/weather'])// Navigates back to the previous location in the history
  }

  loadFavoritesWeather(): void {
    this.favorites.forEach(favorite => {
      this.openCageService.getLocation(favorite).subscribe(
        (data: any) => {
          const lat = data.results[0].geometry.lat;
          const lon = data.results[0].geometry.lng;

          this.openWeatherService.getWeather(lat, lon).subscribe(
            (weather: any) => {
              this.favoriteData[favorite] = weather;
            },
            (error: any) => {
              console.error(`Error fetching weather data for ${favorite}`, error);
            }
          );
        },
        (error: any) => {
          console.error(`Error fetching location data for ${favorite}`, error);
        }
      );
    });
  }

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  removeFavorite(location: string): void {
    this.favoritesService.removeFavorite(location);
    this.favorites = this.favoritesService.getFavorites();
    delete this.favoriteData[location];
  }

  viewWeatherDetails(location: string): void {
    this.openCageService.getLocation(location).subscribe(
      (data: any) => {
        const lat = data.results[0].geometry.lat;
        const lon = data.results[0].geometry.lng;

        this.openWeatherService.getWeather(lat, lon).subscribe(
          (weather: any) => {
            this.favoriteData[location] = weather;
            this.showFavoriteDetails[location] = true;
          },
          (error: any) => {
            console.error(`Error fetching weather data for ${location}`, error);
          }
        );
      },
      (error: any) => {
        console.error(`Error fetching location data for ${location}`, error);
      }
    );
  }

  toggleFavoriteDetails(location: string): void {
    this.showFavoriteDetails[location] = !this.showFavoriteDetails[location];
    if (this.showFavoriteDetails[location] && !this.favoriteData[location]) {
      this.viewWeatherDetails(location);
    }
  }

  getWeatherAlertClass(weather: any): string {
    if (!weather) return '';
    if (weather.main.temp > 30) {
      return 'alert alert-danger';
    } else if (weather.weather[0].main === 'Rain' || weather.weather[0].main === 'Drizzle') {
      return 'alert alert-primary';
    } else {
      return 'alert alert-info';
    }
  }

  getWeatherAlertIcon(weather: any): string {
    if (!weather) return '';
    if (weather.main.temp > 30) {
      return 'sunny';
    } else if (weather.weather[0].main === 'Rain' || weather.weather[0].main === 'Drizzle') {
      return 'rainy';
    } else {
      return '';
    }
  }

  getWeatherAlertMessage(weather: any): string {
    if (!weather) return '';
    if (weather.main.temp > 30) {
      return 'It\'s too sunny! Apply sunscreen.';
    } else if (weather.weather[0].main === 'Rain' || weather.weather[0].main === 'Drizzle') {
      return 'It\'s raining! Don\'t forget your umbrella.';
    } else {
      return 'Enjoy your day!';
    }
  }
}
