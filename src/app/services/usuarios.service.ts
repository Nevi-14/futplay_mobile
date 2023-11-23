import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AlertasService } from './alertas.service';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios';
import * as bcrypt from 'bcryptjs'; // npm install bcryptjs --save  &&  npm install @types/bcrypt --save-dev
import { format } from 'date-fns';
import { PerfilUsuario } from '../models/perfilUsuario';
import { SolicitudesService } from './solicitudes.service';
import { StorageService } from './storage-service';
import { EquiposService } from './equipos.service';
import { UsuarioGeolocalizacion } from '../models/usuarioGeolocalizacion';
import { UsuariosGeolocalizacionService } from './usuarios-geolocalizacion.service';
import { GeolocalizacionService } from './geolocalizacion.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  CorreoVerificacion = '';
  usuarioActual: Usuarios;
  usuarios: PerfilUsuario[] = [];
  userLogin = {
    usuario: '',
    contrasena: '',
    intentos: 0,
  };

  today = new Date();
  lastDayOfMonth = new Date(
    this.today.getFullYear(),
    this.today.getMonth() + 1,
    0
  );
  Fecha_Inicio =
    this.today.getFullYear() +
    '-' +
    (this.today.getMonth() + 1) +
    '-' +
    this.today.getDate();
  Fecha_Fin =
    this.today.getFullYear() +
    '-' +
    (this.lastDayOfMonth.getMonth() + 1) +
    '-' +
    this.lastDayOfMonth.getDate();
  idioma = 'Us';
  file = 'Ingles';

  constructor(
    private http: HttpClient,
    private route: Router,
    public alertasService: AlertasService,
    public actionSheetCtrl: ActionSheetController,
    public solicitudesService: SolicitudesService,
    public storageService: StorageService,
    public equiposService: EquiposService,
    public usuariosGeolocalizacionService: UsuariosGeolocalizacionService,
    public geolocalizacionService: GeolocalizacionService,
    public translateService: TranslateService
  ) {}

  private getValidarCuenta(identificador: number) {
    let URL = this.getURL(environment.getValidarCuentaURL);
    URL = URL + identificador;
    console.log(URL), 'URL';
    return this.http.get<Usuarios>(URL);
  }

  syncValidarCuenta(identificador) {
    return this.getValidarCuenta(identificador).toPromise();
  }

  private postForgotPassword(data) {
    const URL = this.getURL(environment.postForgotPassword);

    const options = {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Acess-Control-Allow-Origin': '*',
      },
    };

    console.log('post url', URL);
    console.log('post user', data);

    return this.http.post(URL, JSON.stringify(data), options);
  }

  syncPostForgotPassword(data) {
    return this.postForgotPassword(data).toPromise();
  }

  private putAvatar(avatars) {
    let URL = this.getURL(environment.putUsuarioAvatarURL);
    URL = URL + avatars.Cod_Usuario;
    const options = {
      headers: {
        enctype: 'multipart/form-data;',
        Accept: 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers':
          'Authorization, Origin, Content-Type, X-CSRF-Token',
      },
    };

    console.log('URL', URL, avatars, 'put avatars', JSON.stringify(avatars));
    return this.http.put(URL, avatars, options);
  }

  syncAvatarToPromise(avatars) {
    return this.putAvatar(avatars).toPromise();
  }
  private postTokenVerification(data) {
    const URL = this.getURL(environment.postTokenVerification);

    const options = {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Acess-Control-Allow-Origin': '*',
      },
    };

    console.log('post url', URL);
    console.log('post user', data);

    return this.http.post(URL, JSON.stringify(data), options);
  }

  syncPostTokenVerification(data) {
    return this.postTokenVerification(data).toPromise();
  }
  private putUserPassword(data) {
    let URL = this.getURL(environment.postUserPassword);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    console.log(URL);
    console.log(data);
    return this.http.post(URL, JSON.stringify(data), options);
  }
  syncPutUserPasswordToPromise($data) {
    return this.putUserPassword($data).toPromise();
  }
  private putJugadorFutplay(Cod_Usuario) {
    let URL = this.getURL(environment.putJugadorFutplayURL);
    URL = URL + Cod_Usuario;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    console.log(URL);
    console.log(Cod_Usuario);
    return this.http.put(URL, JSON.stringify(Cod_Usuario), options);
  }

  private putJugadorDelPartido(Cod_Usuario) {
    let URL = this.getURL(environment.putJugadorDelPartidoURL);
    URL = URL + Cod_Usuario;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    console.log(URL);
    console.log(Cod_Usuario);
    return this.http.put(URL, JSON.stringify(Cod_Usuario), options);
  }
  private imagePost(data, Cod_Usuario) {
    let URL = this.getURL(environment.postFotoUsuarioURL);
    URL = URL + Cod_Usuario;
    const options = {
      headers: {
        enctype: 'multipart/form-data;',
        Accept: 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers':
          'Authorization, Origin, Content-Type, X-CSRF-Token',
      },
    };

    console.log('URL', URL, data, 'data post image', JSON.stringify(data));

    return this.http.post(URL, data, options);
  }

  syncImagePost(data, Cod_Usuario) {
    return this.imagePost(data, Cod_Usuario).toPromise();
  }

  async cerrarSession() {
    this.alertasService.pagina = 'reservaciones';
    await this.storageService.delete('usuario');
    this.route.navigate(['/inicio-sesion']);

    this.equiposService.equipo = null;
    this.equiposService.misEquipos = [];
    this.usuarioActual = null;
  }

  _calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - new Date().getFullYear());
  }

  getURL(api: string) {
    let test: string = '';
    if (!environment.prdMode) {
      test = environment.TestURL;
    }
    const URL = environment.preURL + test + environment.postURL + api;
    return URL;
  }

  // PUT: api/usuarios/?Cod_Usuario= 2   ACTUALIZAR USUARIO

  //
  private putProfile(usuario, Cod_Usuario) {
    let URL = this.getURL(environment.putUsuarioURL);

    URL = URL + Cod_Usuario;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    return this.http.put(URL, JSON.stringify(usuario), options);
  }

  actualizarUsuario(usuario, Cod_Usuario) {
    this.alertasService.presentaLoading(
      this.translateService.instant('PLEASE_WAIT')
    );
    console.log('usuario', usuario);
    this.putProfile(usuario, Cod_Usuario).subscribe(
      (resp: any) => {
        this.loginURL(this.usuarioActual.Correo).subscribe((resp) => {
          this.alertasService.loadingDissmiss();
          this.usuarioActual = resp;

          if (this.usuarioActual.Idioma == 'US') {
            this.idioma = 'US';
            this.file = 'Ingles';
          }  else if (this.usuarioActual.Idioma == 'PO') {
            this.idioma = 'Po';
            this.file = 'Portuguese';
          }
          else {
            this.idioma = 'Es';
            this.file = 'Espanol';
          }
          this.storageService.set('usuario', this.usuarioActual);
          this.translateService.setDefaultLang(this.file);

          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('PROFILE_UPDATED_SUCCESSFULLY')
          );
        });
      },
      (error) => {
        this.alertasService.loadingDissmiss();
        console.log('error', error);
      }
    );
  }

  private getFiltroUsuarios(filtro: any) {
    let URL = this.getURL(environment.getFiltroUsuariosURL);
    let Codigo_Pais = filtro.Codigo_Pais ? filtro.Codigo_Pais : null;
    let Codigo_Estado = filtro.Codigo_Estado ? filtro.Codigo_Estado : null;
    let Codigo_Ciudad = filtro.Codigo_Ciudad ? filtro.Codigo_Ciudad : null;
    let Codigo_Posicion = filtro.Codigo_Posicion
      ? filtro.Codigo_Posicion
      : null;
    URL =
      URL +
      Codigo_Pais +
      '/' +
      Codigo_Estado +
      '/' +
      Codigo_Ciudad +
      '/' +
      Codigo_Posicion;
    return this.http.get<PerfilUsuario[]>(URL);
  }

  private getUsuario(Cod_Usuario: number) {
    let URL = this.getURL(environment.getUsuario);
    URL = URL + Cod_Usuario;
    console.log(URL, 'URL');
    return this.http.get<Usuarios>(URL);
  }
  private getUserImage(api: string) {
    console.log('api', api);

    return this.http.get<any>(api);
  }
  syncGetUsuario(Cod_Usuario: number) {
    return this.getUsuario(Cod_Usuario).toPromise();
  }

  syncfiltrarUsuariosToPromise(filtro: any) {
    return this.getFiltroUsuarios(filtro).toPromise();
  }

  public loginURL(entrada: string) {
    let URL = this.getURL(environment.getLoginURL);
    URL = URL + entrada;
    console.log(URL);
    return this.http.get<Usuarios>(URL);
  }

  private getListaUsuarios(Cod_Usuario) {
    let URL = this.getURL(environment.getListaUsuariosURL);
    URL = URL + Cod_Usuario;
    console.log(URL);
    return this.http.get<PerfilUsuario[]>(URL);
  }

  syncListaUsuariosToPromise(Cod_Usuario) {
    return this.getListaUsuarios(Cod_Usuario).toPromise();
  }

  syncJugadorFutplay(Cod_Usuario) {
    return this.putJugadorFutplay(Cod_Usuario).toPromise();
  }

  syncJugadorDelPartido(Cod_Usuario) {
    return this.putJugadorDelPartido(Cod_Usuario).toPromise();
  }
  syncLogin(entrada: string, contrasena: string) {
    this.alertasService.presentaLoading(
      this.translateService.instant('PLEASE_WAIT')
    );

    this.loginURL(entrada).subscribe(
      async (resp) => {
        console.log('resp', resp);
        if (resp) {
          this.alertasService.loadingDissmiss();
          this.usuarioActual = resp;

          let usuario = await this.storageService.get('usuario');

          if (this.comparePassword(contrasena, resp.Contrasena)) {
            this.usuarioActual = resp;
            this.storageService.set('usuario', this.usuarioActual);
            let usuario = await this.storageService.get('usuario');
            this.alertasService.segment = 'torneos';
            this.route.navigateByUrl('/futplay/torneos', {
              replaceUrl: true,
            });
          } else {
            this.alertasService.loadingDissmiss();
            this.alertasService.message(
              'FUTPLAY',
              this.translateService.instant('INCORRECT_USER_OR_PASSWORD')
            );

            return;
          }
        } else {
          this.alertasService.loadingDissmiss();
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('INCORRECT_USER_OR_PASSWORD')
          );
        }
      },
      (error) => {
        this.alertasService.loadingDissmiss();
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('CONTACT_ADMINISTRATOR')
        );
      }
    );
  }

  // REMUEVE ESPACIOS

  removerEspacios(element: string) {
    return element.split(' ').join('');
  }

  // VALIDAR CORREO

  validarCorreo(email) {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  // END LOGIN SECTION

  // POST USUARIO

  private postUsuario(usuario) {
    const URL = this.getURL(environment.postUserURL);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    return this.http.post(URL, JSON.stringify(usuario), options);
  }

  comparePassword(password, databasePwd) {
    if (bcrypt.compareSync(password, databasePwd)) {
      return true;
    } else {
      return false;
    }
  }

  hashPassword(Contrasena) {
    return bcrypt.hashSync(Contrasena, 10);
  }

  registro(usuario: Usuarios, geolocalizacion: UsuarioGeolocalizacion) {
    this.alertasService.presentaLoading(
      this.translateService.instant('PLEASE_WAIT')
    );
    usuario.Fecha_Nacimiento = format(
      new Date(usuario.Fecha_Nacimiento),
      'yyyy-MM-dd'
    );
    usuario.Contrasena = bcrypt.hashSync(usuario.Contrasena, 10);
    this.postUsuario(usuario).subscribe(
      (resp: any) => {
        this.usuarioActual = resp[0];
        this.storageService.set('usuario', this.usuarioActual);
        geolocalizacion.Cod_Usuario = resp[0].Cod_Usuario;
        geolocalizacion.Codigo_Pais = this.geolocalizacionService.Codigo_Pais;
        let indexPais = this.geolocalizacionService.paises.findIndex(
          (e) => e.id == this.geolocalizacionService.Codigo_Pais
        );
        if (indexPais >= 0) {
          geolocalizacion.Pais =
            this.geolocalizacionService.paises[indexPais].valor;
        }
        this.usuariosGeolocalizacionService
          .syncPostUsuarioGeolocalizacionToPromise(geolocalizacion)
          .then(
            (resp) => {
              this.alertasService.loadingDissmiss();

              this.alertasService.pagina = 'reservaciones';
              return this.route.navigateByUrl('/futplay/reservaciones', {
                replaceUrl: true,
              });
            },
            (error) => {
              this.alertasService.loadingDissmiss();
              this.alertasService.message(
                'FUTPLAY',
                this.translateService.instant('SOMETHING_WENT_WRONG')
              );
            }
          );
      },
      (error) => {
        this.alertasService.loadingDissmiss();
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('SOMETHING_WENT_WRONG')
        );
      }
    );
  }
  private deleteUser(id: number) {
    let URL = this.getURL(environment.deleteUser);
    URL = URL + id;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    return this.http.delete(URL, options);
  }

  syncDeleteUserToPromise(id: any) {
    return this.deleteUser(id).toPromise();
  }
}
