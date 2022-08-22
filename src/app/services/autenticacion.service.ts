import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(

    public http: HttpClient

  ) { }

  getURL(api: string) {

    let test: string = ''

    if (!environment.prdMode) {

      test = environment.TestURL;

    }

    const URL = environment.preURL + test + environment.postURL + api

    return URL;
  }

  private actualizarToken(Cod_Usuario, Codigo_Token, Expiracion_Token) {

    let URL = this.getURL(environment.actualizarTokenURL);
    URL = URL + environment.codUsuarioParam + Cod_Usuario + environment.Codigo_TokenParam + Codigo_Token + environment.Expiracion_TokenParam + Expiracion_Token;

    console.log(URL, ' PUT TOKEN')
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.put(URL, options);
  }

  actulizarTokenPromise(Cod_Usuario, Codigo_Token, Expiracion_Token) {

    return this.actualizarToken(Cod_Usuario, Codigo_Token, Expiracion_Token).toPromise();

  }

  private actualizarContrasena(Codigo_Token, Contrasena) {

    let URL = this.getURL(environment.actuzalizarContrasenaURL);
    URL = URL + environment.Codigo_Token + Codigo_Token + environment.contrasenaPatam + Contrasena;

    console.log(URL, 'actualizar')
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.put(URL, options);
  }

  actualizarContrasenaPromise(Codigo_Token, Contrasena) {

    return this.actualizarContrasena(Codigo_Token, Contrasena).toPromise();

  }

}
