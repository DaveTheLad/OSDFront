import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { DarkModeService } from '../dark-mode.service';

interface Manga {
  id: number;
  title: string;
  author: string;
  year_written: number;
  NumberOfVolumes: number;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Manga App';
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private http: HttpClient,
    private darkModeService: DarkModeService
  ) {}
  isAuthenticated$ = this.auth.isAuthenticated$;

  mangas: Manga[] = [];
  filteredMangas: Manga[] = [];
  searchTerm: string = '';
  darkModeEnabled: boolean = this.darkModeService.getDarkModeEnabled();

  ngOnInit() {
    this.http.get<Manga[]>('/api/mangas').subscribe((data: Manga[]) => {
      this.mangas = data;
      this.filteredMangas = data;
    });
    if (this.darkModeEnabled) {
      this.document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.darkModeService.setDarkModeEnabled(this.darkModeEnabled);
    if (this.darkModeEnabled) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }
}
