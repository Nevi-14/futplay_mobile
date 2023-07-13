import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioGeolocalizacion } from '../models/usuarioGeolocalizacion';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGeolocalizacionService {

  constructor(
    private http: HttpClient,
    public alertasService: AlertasService
  ) { }
  reload: boolean = false;
  // GET  METHODS

  getURL(api: string) {

    let test: string = ''
    if (!environment.prdMode) {
      test = environment.TestURL;

    }
    const URL = environment.preURL + test + environment.postURL + api;


    return URL;
  }

  private getUsuarioGeolocalizacion(Cod_Usuario) {
    let URL = this.getURL(environment.getUsuarioGeolocalizacion);
    URL = URL + Cod_Usuario
    console.log(URL, 'URL ')
    return this.http.get<UsuarioGeolocalizacion[]>(URL);
  }


  private postUsuarioGeolocalizacion(geolocaizacion: UsuarioGeolocalizacion) {
    let URL = this.getURL(environment.postUsuarioGeolocalizacion);
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
  private putUsuarioGeolocalizacion(geolocaizacion: UsuarioGeolocalizacion) {
    let URL = this.getURL(environment.putUsuarioGeolocalizacion);
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
  private deleteUsuarioGeolocalizacion(Cod_Usuario) {

    let URL = this.getURL(environment.deleteUsuarioGeolocalizacion);
    URL = URL + Cod_Usuario;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.delete(URL, options);
  }

  syncGetUsuarioGeolocalizacionToPromise(Cod_Usuario: number) {
    return this.getUsuarioGeolocalizacion(Cod_Usuario).toPromise();
  }
  syncPostUsuarioGeolocalizacionToPromise(geolocalizacion: UsuarioGeolocalizacion) {
    return this.postUsuarioGeolocalizacion(geolocalizacion).toPromise();
  }
  syncPutUsuarioGeolocalizacionToPromise(geolocalizacion: UsuarioGeolocalizacion) {
    return this.putUsuarioGeolocalizacion(geolocalizacion).toPromise();
  }
  syncDeleteUsuarioGeolocalizacionToPromise(Cod_Usuario: number) {
    return this.deleteUsuarioGeolocalizacion(Cod_Usuario).toPromise();
  }
}
