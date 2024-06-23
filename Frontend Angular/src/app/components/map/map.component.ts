import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { LeafletLoaderService } from '../../services/leaflet-loader.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() latitude!: number;
  @Input() longitude!: number;

  private map: any;
  private marker: any;

  constructor(private leafletLoader: LeafletLoaderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] && changes['longitude']) {
      if (this.map) {
        this.updateMap();
      }
    }
  }

  ngAfterViewInit(): void {
    this.leafletLoader.loadLeaflet().then(() => {
      this.initializeMap();
    }).catch((error: any) => {
      console.error('Error loading Leaflet:', error);
    });
  }

  private initializeMap(): void {
    const L = window['L'];

    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 10,
      zoomControl: false  // Disable default zoom control
    });

    // Add zoom control with custom position
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    // Custom map style without the language property
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      tileSize: 512,
      zoomOffset: -1
    });

    tiles.addTo(this.map);

    // Add marker
    const markerIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
    });

    this.marker = L.marker([this.latitude, this.longitude], { icon: markerIcon }).addTo(this.map);

    // Set map view to the new location
    this.map.setView([this.latitude, this.longitude], 10);
  }

  private updateMap(): void {
    if (this.marker) {
      this.marker.setLatLng([this.latitude, this.longitude]);
    }

    // Set map view to the new location
    this.map.setView([this.latitude, this.longitude], 10);
  }
}


