import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly darkModeKey = 'darkModeEnabled';

  constructor() {}

  getDarkModeEnabled(): boolean {
    const darkModeValue = localStorage.getItem(this.darkModeKey);
    return darkModeValue ? JSON.parse(darkModeValue) : false;
  }

  setDarkModeEnabled(enabled: boolean): void {
    localStorage.setItem(this.darkModeKey, JSON.stringify(enabled));
  }
}
