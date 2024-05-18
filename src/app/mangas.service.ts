import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangasService {

  constructor(private http: HttpClient) { }

  addManga(manga: any) {
    return this.http.post('http://localhost:8080/endpoint/add-manga', manga);
  }

  listManga() {
    return this.http.get('http://localhost:8080/endpoint/');
  }

  deleteManga(id: any) {
    return this.http.delete('http://localhost:8080/endpoint/delete-manga/' + id);
  }

  singleManga(id: any) {
    return this.http.get('http://localhost:8080/endpoint/manga/' + id);
  }

  updateManga(id: any, manga: any) {
    return this.http.put('http://localhost:8080/endpoint/update-manga/' + id, manga);
  }

  searchManga(keyword: string) {
    let params = new HttpParams().set('key', keyword);
    return this.http.get('http://localhost:8080/endpoint/search', { params: params });
  }
}
