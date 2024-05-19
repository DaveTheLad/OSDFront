import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangasService {

  constructor(private http: HttpClient) { }

  addManga(manga: any) {
    return this.http.post('https://osdapi-production.up.railway.app/endpoint/add-manga', manga);
  }

  listManga() {
    return this.http.get('https://osdapi-production.up.railway.app/endpoint/');
  }

  deleteManga(id: any) {
    return this.http.delete('https://osdapi-production.up.railway.app/endpoint/delete-manga/' + id);
  }

  singleManga(id: any) {
    return this.http.get('https://osdapi-production.up.railway.app/endpoint/manga/' + id);
  }

  updateManga(id: any, manga: any) {
    return this.http.put('https://osdapi-production.up.railway.app/endpoint/update-manga/' + id, manga);
  }

  searchManga(keyword: string) {
    let params = new HttpParams().set('key', keyword);
    return this.http.get('https://osdapi-production.up.railway.app/endpoint/search', { params: params });
  }
}
