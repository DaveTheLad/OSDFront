// list-manga.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangasService } from '../mangas.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-list-manga',
  templateUrl: './list-manga.component.html',
  styleUrls: ['./list-manga.component.css']
})
export class ListMangaComponent implements OnInit {
  mangas: any;
  searchForm: FormGroup;
  filteredMangas: any;
  user: any;
  darkModeEnabled: boolean = false; // Added darkModeEnabled property
  deleteSuccessMessage: string = ''; // New property to store delete success message

  constructor(
    private mangaservice: MangasService,
    private router: Router,
    public auth: AuthService
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      if (this.user && this.user.email?.includes('@atu.ie')) {
        this.loadManga();
      } else {
        this.mangaservice.listManga().subscribe((data: any) => {
          this.mangas = data;
          this.filteredMangas = data.map((manga: any) => ({...manga, canEdit: false, canDelete: false}));
        });
      }
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.filteredMangas = this.mangas.filter((manga: any) =>
          manga.title.toLowerCase().includes(value.search.toLowerCase()) ||
          manga.year_written.toString().includes(value.search) ||
          manga.NumberOfVolumes.toString().includes(value.search) ||
          manga.author.toLowerCase().includes(value.search.toLowerCase())
        ).map((manga: any) => ({...manga, canEdit: this.canEdit(manga), canDelete: this.canDelete(manga)}));
      });
  }

  loadManga() {
    this.mangaservice.listManga().subscribe((data: any) => {
      this.mangas = data;
      this.filteredMangas = data.map((manga: any) => ({...manga, canEdit: this.canEdit(manga), canDelete: this.canDelete(manga)}));
    });
  }

  canEdit(manga: any): boolean {
    return this.user && this.user.email?.includes('@atu.ie');
  }

  canDelete(manga: any): boolean {
    return this.user && this.user.email?.includes('@atu.ie');
  }

  delManga(datas: any) {
    if (datas.canDelete) {
      this.mangaservice.deleteManga(datas._id).subscribe((data) => {
        console.log(data);
        this.mangas = this.mangas.filter((u: any) => u !== datas);
        this.filteredMangas = this.filteredMangas.filter((u: any) => u !== datas);
        this.deleteSuccessMessage = 'Manga successfully deleted!';
        setTimeout(() => {
          this.deleteSuccessMessage = ''; 
        }, 3000); 
      });
    } else {
      console.log('User is not authorized to delete manga.');
    }
  }

  resetManga(): void {
    this.loadManga();
  }
}
