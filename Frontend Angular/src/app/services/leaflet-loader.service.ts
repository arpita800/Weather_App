// // leaflet-loader.service.ts

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LeafletLoaderService {

//   private scriptLoaded = false;

//   constructor() { }

//   loadLeaflet(): Promise<void> {
//     return new Promise<void>((resolve, reject) => {
//       if (this.scriptLoaded) {
//         resolve();
//         return;
//       }

//       const script = document.createElement('script');
//       script.onload = () => {
//         this.scriptLoaded = true;
//         resolve();
//       };
//       script.onerror = (error) => {
//         reject(error);
//       };
//       script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
//       document.body.appendChild(script);
//     });
//   }
// }



import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeafletLoaderService {
  private scriptLoaded = false;

  constructor() { }

  loadLeaflet(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      leafletScript.onload = () => {
        const geocoderScript = document.createElement('script');
        geocoderScript.src = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';
        geocoderScript.onload = () => {
          this.scriptLoaded = true;
          resolve();
        };
        geocoderScript.onerror = (error) => {
          reject(error);
        };
        document.body.appendChild(geocoderScript);
      };
      leafletScript.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(leafletScript);
    });
  }
}
