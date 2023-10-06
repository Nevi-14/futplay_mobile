import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CodigosDescuento } from '../models/codigoDescuento';

@Injectable({
  providedIn: 'root'
})
export class CodigosDescuentosService {
  constructor(public http: HttpClient) {}

  getURL(api: string) {
    let test = '';
    if (!environment.prdMode) {
      test = environment.TestURL;
    }
    const URL = environment.preURL + test + environment.postURL + api;
    return URL;
  }

  private getDescuento(codigoDescuento: string) {
    const URL = this.getURL(environment.getCodigosDesciuentosURL) + codigoDescuento;
    console.log(URL, 'URL ');
    return this.http.get<CodigosDescuento[]>(URL);
  }

  getDescuentoToPromise(codigoDescuento: string) {
    return this.getDescuento(codigoDescuento).toPromise();
  }
}