import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/usuarios';
import { AlertasService } from 'src/app/services/alertas.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';
import { Provincias } from 'src/app/models/provincias';
import { Cantones } from 'src/app/models/cantones';
import { Distritos } from 'src/app/models/distritos';
import { ValidacionFormularioPipe } from 'src/app/pipes/validacion-formulario.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { UsuarioGeolocalizacion } from 'src/app/models/usuarioGeolocalizacion';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  @ViewChild('mySlider', { static: true }) slides: IonSlides;
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
    Codigo_Llamadas: '+506',
    Estado:true,
    Descripcion_Estado:null,
    Inicio_Sesion:new Date()
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

 geolocalizacion:UsuarioGeolocalizacion = {
   ID:  null,
   Cod_Usuario:  null,
   Codigo_Pais:  null,
   Codigo_Estado:  null,
   Codigo_Ciudad:  null,
   Codigo_Postal:  null,
   Direccion:  null
 }
  constructor(
    public usuariosServicio: UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCrtl: ModalController,
    public alertasService: AlertasService,
    public http:HttpClient,
    public geolocalizacionService:GeolocalizacionService
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
        Codigo_Llamadas: '+506',
        Estado:true,
        Descripcion_Estado:null,
        Inicio_Sesion:new Date()
      };


   


  }


  async seleccionarFecha() {
    if (!this.modalOpen) {
      this.modalOpen = true;
      const modal = await this.modalCrtl.create({
        component: SeleccionarFechaPage,
        breakpoints: [0, 0.3, 0.5, 0.8],
        initialBreakpoint: 0.5,
        cssClass: 'medium-modal',
        mode: 'ios',
        componentProps: {
          title: 'Fecha de nacimiento',
          id: 'seleccionar-fecha',
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
    if (!continuar) return this.alertasService.message('FUTPLAY', 'Todos los campos son obligatorios!');
    this.enviarFormulario = true;
    this.usuario.Nombre = registro.Nombre
    this.usuario.Primer_Apellido = registro.Primer_Apellido
    this.usuario.Telefono = registro.Telefono
    this.usuario.Correo = registro.Correo
    this.ingresarContrasena = registro.password;
    this.usuario.Contrasena = this.ingresarContrasena;
    this.usuariosServicio.registro(this.usuario, this.geolocalizacion)

  }

 






}
