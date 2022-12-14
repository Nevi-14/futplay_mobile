import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoriaCanchas } from '../models/categoriaCanchas';

@Injectable({
  providedIn: 'root'
})
export class CategoriaCanchasService {

  categoria_canchas: CategoriaCanchas[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getURL(api: string, id: string) {
    let test: string = ''
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

    this.categoria_canchas = [];


    this.getCategoriaCanchas().subscribe(
      resp => {



        this.categoria_canchas = resp.slice(0);
        console.log(this.categoria_canchas, 'this.categoria_canchas')
      }

    );
  }
  syncCategoriaCanchasToPromise() {
    return this.getCategoriaCanchas().toPromise();
  }

}
