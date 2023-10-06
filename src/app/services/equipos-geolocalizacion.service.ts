import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EquipoGeolocalizacion } from '../models/equipoGeolocalizacion';

@Injectable({
  providedIn: 'root'
})
export class EquiposGeolocalizacionService {

  constructor(
    private http: HttpClient,
    public alertasService: AlertasService
  ) { }

  getURL(api: string) {
    let test: string = ''
    if (!environment.prdMode) {
      test = environment.TestURL;
    }
    const URL = environment.preURL + test + environment.postURL + api;
    return URL;
  }

  private getEquipoGeolocalizacion(Cod_Equipo) {
    let URL = this.getURL(environment.getEquipoGeolocalizacion);
    URL = URL + Cod_Equipo
    console.log(URL, 'URL ')
    return this.http.get<EquipoGeolocalizacion[]>(URL);
  }

  private postEquipoGeolocalizacion(geolocaizacion: EquipoGeolocalizacion) {
    let URL = this.getURL(environment.postEquipoGeolocalizacion);
    URL = URL;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    console.log('POST URL', URL, 'geolocaizacion', geolocaizacion)
    return this.http.post(URL, JSON.stringify(geolocaizacion), options);
  }

  private putEquipoGeolocalizacion(geolocaizacion: EquipoGeolocalizacion) {
    let URL = this.getURL(environment.putEquipoGeolocalizacion);
    URL = URL;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    console.log('PUT URL', URL, 'geolocaizacion', geolocaizacion)
    return this.http.put(URL, JSON.stringify(geolocaizacion), options);
  }

  private deleteEquipoGeolocalizacion(Cod_Equipo) {
    let URL = this.getURL(environment.deleteEquipoGeolocalizacion);
    URL = URL + Cod_Equipo;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.delete(URL, options);
  }

  syncGetEquipoGeolocalizacionToPromise(Cod_Equipo: number) {
    return this.getEquipoGeolocalizacion(Cod_Equipo).toPromise();
  }

  syncPostEquipoGeolocalizacionToPromise(geolocalizacion: EquipoGeolocalizacion) {
    return this.postEquipoGeolocalizacion(geolocalizacion).toPromise();
  }

  syncPutEquipoGeolocalizacionToPromise(geolocalizacion: EquipoGeolocalizacion) {
    return this.postEquipoGeolocalizacion(geolocalizacion).toPromise();
  }

  syncDeleteEquipoGeolocalizacionToPromise(Cod_Equipo: number) {
    return this.deleteEquipoGeolocalizacion(Cod_Equipo).toPromise();
  }
}