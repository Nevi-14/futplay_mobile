
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/usuarios';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValidacionFormularioPipe } from 'src/app/pipes/validacion-formulario.pipe';
import { UsuarioGeolocalizacion } from 'src/app/models/usuarioGeolocalizacion';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { EmailService } from 'src/app/services/email';
import { TranslateService } from '@ngx-translate/core';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage  {
  usuario: Usuarios = {
    Cod_Usuario: null,
    Cod_Posicion: 1,
    Cod_Role: 3,
    Foto: 'user.svg',
    Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Fecha_Nacimiento: new Date(),
    Telefono: '',
    Correo: '',
    Contrasena: '',
    Intentos: 0,
    Peso: 0,
    Estatura: 0,
    Apodo: '',
    Partidos_Jugados: 0,
    Partidos_Jugador_Futplay: 0,
    Partidos_Jugador_Del_Partido: 0,
    Compartir_Datos: false,
    Avatar: true,
    Codigo_Llamadas: null,
    Estado: true,
    Descripcion_Estado: null,
    Inicio_Sesion: new Date(),
    Idioma:null
  };
  ingresarContrasena = '';
  provincia = null;
  canton: null;
  distrito: null;
  showCanton = null;
  showDistrito = null;
  modalOpen: boolean = false;
  dataProvincias = [];
  dataCantones = [];
  dataDistritos = [];
  enviarFormulario: boolean = false;
  Cod_Provincia = null;
  Cod_Canton = null;
  Cod_Distrito = null;

  geolocalizacion: UsuarioGeolocalizacion = {
    ID: null,
    Cod_Usuario: null,
    Codigo_Pais: null,
    Pais: null,
    Codigo_Estado: null,
    Estado: null,
    Codigo_Ciudad: null,
    Ciudad: null,
    Codigo_Postal: null,
    Direccion: null
  }
  sendEmail = {
    email: null,
    header: null,
    subject: this.translateService.instant('ACCOUNT_VEIRIFICATION'),
    message: null,
  };
 
  token = null;
  codigo = null;
  verificarCodigo = false;
  constructor(
    public usuariosServicio: UsuariosService,
    public modalCrtl: ModalController,
    public alertasService: AlertasService,
    public geolocalizacionService: GeolocalizacionService,
    public emailService:EmailService,
    private translateService: TranslateService
  ) { }


  ionViewWillEnter() {
    this.limpiarDatos()
    this.geolocalizacionService.loadCountries();
  }
  async limpiarDatos() {
    this.usuario = {
      Cod_Usuario: null,
      Cod_Posicion: 1,
      Cod_Role: 3,
      Foto: 'user.svg',
      Nombre: '',
      Primer_Apellido: '',
      Segundo_Apellido: '',
      Fecha_Nacimiento: new Date(),
      Telefono: '',
      Correo: '',
      Contrasena: '',
      Intentos: 0,
      Peso: 0,
      Estatura: 0,
      Apodo: '',
      Partidos_Jugados: 0,
      Partidos_Jugador_Futplay: 0,
      Partidos_Jugador_Del_Partido: 0,
      Compartir_Datos: false,
      Avatar: true,
      Codigo_Llamadas:null,
      Estado: true,
      Descripcion_Estado: null,
      Inicio_Sesion: new Date(),
      Idioma:null
    };
  }

  async seleccionarFecha() {
    if (!this.modalOpen) {
      this.modalOpen = true;
      const modal = await this.modalCrtl.create({
        component: SeleccionarFechaPage,
        cssClass:'alert-modal',
        mode:'ios', 
        componentProps: {
          title: this.translateService.instant('DATE_OF_BIRTH'),
          fecha: new Date(this.usuario.Fecha_Nacimiento)
        }
      })
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if (data !== undefined) {
        this.usuario.Fecha_Nacimiento = data.date
        this.modalOpen = false;
      } else {
        this.modalOpen = false;
      }
    }

  }

  async registro(fRegistro: NgForm) {
    let registro = fRegistro.value;
    let continuar = await ValidacionFormularioPipe.prototype.transform(fRegistro);
    if (!continuar) return this.alertasService.message('FUTPLAY', this.translateService.instant('ALL_FIIELD_ARE_REQUIRED'));
    if(registro.password.length < 8) return this.alertasService.message('FUTPLAY', this.translateService.instant('MIN_PASSWORD_LENGTH'))
    this.enviarFormulario = true;
    this.usuario.Nombre = registro.Nombre
    this.usuario.Primer_Apellido = registro.Primer_Apellido
    this.usuario.Telefono = registro.Telefono
    this.usuario.Codigo_Llamadas = registro.Codigo_Llamadas
    this.usuario.Correo = registro.Correo
    this.ingresarContrasena = registro.password;
    this.usuario.Contrasena = this.ingresarContrasena;
    this.sendEmail.email = registro.Correo;
    if(this.verificarCodigo){ 
      if(this.token != registro.codigo) {return this.alertasService.message('FUTPLAY',this.translateService.instant('INCORRECT_CODE'));}
      return  this.usuariosServicio.registro(this.usuario, this.geolocalizacion)
    } 
    this.alertasService.presentaLoading(this.translateService.instant('VALIDATING_DATA'));
    return this.usuariosServicio.syncValidarCuenta(this.sendEmail.email).then((resp:any)=>{
      if(resp == 403) {
        let token = String(new Date().getHours()) + String(new Date().getMinutes()) + String(new Date().getMilliseconds());
        this.sendEmail.header = this.translateService.instant('DEAR_USER') + ' ' +  this.usuario.Nombre + ' ' + this.usuario.Primer_Apellido;
        this.sendEmail.message =  `${this.translateService.instant('ACCOUNT_VERIFICATION_MESSAGE')}   ${token}`;
         return this.emailService.syncPostEmail(this.sendEmail).then((resp:any)=>{
    this.alertasService.loadingDissmiss();
    this.token = token;
    this.verificarCodigo = true;
    this.alertasService.message('FUTPLAY', this.translateService.instant('SECURITY_CODE_MESSAGE'))
  }, error =>{ 
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
  })
      }
      this.alertasService.loadingDissmiss();
      return this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
    })
  }
}
