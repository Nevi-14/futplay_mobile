import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cantones } from '../models/cantones';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class CantonesService {

  cantones: Cantones[] = [];


  constructor(

    private http: HttpClient,
    public aslertasService: AlertasService

  ) { }

  getURL(api: string, provincia: string) {
    let test: string = ''
    if (!environment.prdMode) {
      test = environment.TestURL;
    }

    const URL = environment.preURL + test + environment.postURL + api + environment.Cod_Provincia + provincia;
    console.log(URL);
    return URL;
  }
  private getCantones(provincia) {
    const URL = this.getURL(environment.cantonesURL, provincia);
    return this.http.get<Cantones[]>(URL);
  }

  syncCantones(provincia) {

    return this.getCantones(provincia).toPromise();
  }

}
