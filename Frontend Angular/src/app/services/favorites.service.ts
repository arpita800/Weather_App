import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKey = 'weatherFavorites';

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage;
  }

  getFavorites(): string[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(location: string): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    const favorites = this.getFavorites();
    if (!favorites.includes(location)) {
      favorites.push(location);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(location: string): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(fav => fav !== location);
    localStorage.setItem(this.favoritesKey, JSON.stringify(updatedFavorites));
  }

  isFavorite(location: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const favorites = this.getFavorites();
    return favorites.includes(location);
  }
}
