import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoriaCanchas } from '../models/categoriaCanchas';

@Injectable({
  providedIn: 'root',
})
export class CategoriaCanchasService {
  categoriaCanchas: CategoriaCanchas[] = [];

  constructor(private http: HttpClient) {}

  getURL(api: string, id: string) {
    let test = '';
    if (!environment.prdMode) {
      test = environment.TestURL;
    }

    const URL = environment.preURL + test + environment.postURL + api + id;
    console.log(URL);
    return URL;
  }

  private getCategoriaCanchas() {
    const URL = this.getURL(environment.getCategoriasURL, '');
    return this.http.get<CategoriaCanchas[]>(URL);
  }

  syncCategoriaCanchas() {
    this.categoriaCanchas = [];

    this.getCategoriaCanchas().subscribe((resp) => {
      this.categoriaCanchas = resp.slice(0);
    });
  }

  syncCategoriaCanchasToPromise() {
    return this.getCategoriaCanchas().toPromise();
  }
}
