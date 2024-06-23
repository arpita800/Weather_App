import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { OpenWeatherService } from '../services/open-weather.service';
import { Router } from '@angular/router';

interface LegendItem {
  color: string;
  label: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public map: any;
  private weatherLayer: any;
  private markerIcon: any;
  private apiKey = '53301e7d5f33bd18b5954d6d8149973c';  // Replace with your actual API key
  public weatherData: any;
  public currentCondition!: string;
  public legend: LegendItem[] = [];

  // Define types and descriptions for weather layers
  private weatherLayers: { [key: string]: { url: string, description: string } } = {
    'temp_new': { url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${this.apiKey}', description: 'Temperature' },
    'precipitation_new': { url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.apiKey}', description: 'Precipitation' },
    'clouds_new': { url: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${this.apiKey}', description: 'Cloud Coverage' },
    'wind_new': { url: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${this.apiKey}', description: 'Wind Speed' }
  };

  constructor(private http: HttpClient, private openWeatherService: OpenWeatherService,  private router: Router) { }

  ngOnInit(): void {
    this.initMap();
    this.initMarkerIcon();
  }



  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Add initial weather layer
    this.addWeatherLayer('temp_new');
  }

  goBack() {
    this.router.navigate(['/weather'])// Navigates back to the previous location in the history
  }


  private initMarkerIcon(): void {
    this.markerIcon = L.icon({
      iconUrl: 'https://static.vecteezy.com/system/resources/previews/023/554/762/large_2x/red-map-pointer-icon-on-a-transparent-background-free-png.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  navigateToFeedback() {
    this.router.navigate(['/feedback']); 
  } 

  private addWeatherLayer(layerType: string): void {
    const layer = this.weatherLayers[layerType];
    if (!layer) return;

    const weatherLayerUrl = layer.url.replace('${this.apiKey}', this.apiKey);
    if (this.weatherLayer) {
      this.map.removeLayer(this.weatherLayer);
    }
    this.weatherLayer = L.tileLayer(weatherLayerUrl, {
      maxZoom: 18,
      attribution: `Weather data © OpenWeatherMap - ${layer.description}`
    }).addTo(this.map);
    this.currentCondition = layerType;
    this.updateLegend();
  }

  private updateLegend(): void {
    this.legend = this.legendData[this.currentCondition];
  }

  private marker: any;

  searchCity(city: string): void {
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
    
    this.http.get(geocodeUrl).subscribe((data: any) => {
      if (data.length > 0) {
        const { lat, lon } = data[0];
        this.map.setView([lat, lon], 10);
    
        // Remove existing marker
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
    
        // Add new marker
        this.marker = L.marker([lat, lon], { icon: this.markerIcon }).addTo(this.map);
        this.marker.bindPopup(city).openPopup();
    
        // Fetch and display weather data for the city
        this.openWeatherService.getWeather(lat, lon).subscribe(weatherData => {
          this.weatherData = weatherData;
        });
      } else {
        alert('City not found');
      }
    }, error => {
      console.error('Error fetching city coordinates:', error);
      alert('Error fetching city coordinates');
    });
  }

  switchLayer(layerType: string): void {
    this.addWeatherLayer(layerType);
  }

  legendData: { [key: string]: LegendItem[] } = {
    temp_new: [
      { color: '#FF0000', label: 'High Temperature (>25°C)' },
      { color: '#FFA500', label: 'Moderate Temperature (15°C-25°C)' },
      { color: '#FFFF00', label: 'Low Temperature (<15°C)' }
    ],
    precipitation_new: [
      { color: '#00008B', label: 'Heavy Rain (>10mm/h)' },
      { color: '#0000CD', label: 'Moderate Rain (5mm/h-10mm/h)' },
      { color: '#ADD8E6', label: 'Light Rain (<5mm/h)' }
    ],
    clouds_new: [
      { color: '#888888', label: 'Cloudy (>50% coverage)' },
      { color: '#CCCCCC', label: 'Partly Cloudy (20%-50% coverage)' },
      { color: '#FFFFFF', label: 'Clear Skies (<20% coverage)' }
    ],
    wind_new: [
      { color: '#00008B', label: 'Strong Wind (>20m/s)' },
      { color: '#0000CD', label: 'Moderate Wind (10m/s-20m/s)' },
      { color: '#ADD8E6', label: 'Light Wind (<10m/s)' }
    ]
  };

  

}
