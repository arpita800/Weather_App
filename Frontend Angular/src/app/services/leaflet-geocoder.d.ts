import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    function geocoder(options?: any): L.Control;
  }

  interface Control {
    on(type: string, handler: (e: any) => void): any;
  }
}
