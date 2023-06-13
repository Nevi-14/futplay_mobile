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

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage  {
@ViewChild('mySlider', { static: true }) slides: IonSlides;
usuario: Usuarios = {
  Cod_Usuario:null,
  Cod_Provincia: null,
  Cod_Canton : null,
  Cod_Distrito : null,
  Cod_Posicion: 1,
  Cod_Role: 3,
  Modo_Customizado: false,
  Foto: 'user.svg',
  Nombre: '',
  Primer_Apellido: '',
  Segundo_Apellido: '',
  Fecha_Nacimiento: new Date(),
  Telefono: '',
  Correo: '',
  Contrasena: '',
  Intentos:0,
  Peso: 0,
  Estatura: 0,
  Apodo: '',
  Partidos_Jugados: 0,
  Partidos_Jugador_Futplay: 0,
  Partidos_Jugador_Del_Partido : 0,
  Compartir_Datos : false,
  Avatar: true,
  Pais:'CR',
  Cod_Pais:'+506'
};
ingresarContrasena ='';
confirmarContrasena ='';
showPass = false;
showPassConfirm = false;
provincia = null;
canton: null;
distrito: null;
showCanton = null;
showDistrito = null;
modalOpen:boolean = false;
 dataProvincias = [];
 dataCantones = [];
 dataDistritos = [];

  constructor(
    public usuariosServicio : UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCrtl: ModalController,
    public alertasService: AlertasService
  ) { }



  ionViewWillEnter(){
this.limpiarDatos()
}

async limpiarDatos(){
  let provincias = await this.provinciasService.syncProvinciasPromise();

  provincias.forEach((provincia:Provincias, index)=>{
 
let data  = {
  id : provincia.Cod_Provincia,
  valor: provincia.Provincia
}
console.log(data,'data')
this.dataProvincias.push(data)
    if(index == provincias.length -1){

      this.usuario = {
        Cod_Usuario:null,
        Cod_Provincia: null,
        Cod_Canton : null,
        Cod_Distrito : null,
        Cod_Posicion: 1,
        Cod_Role: 3,
        Modo_Customizado: false,
        Foto: 'user.svg',
        Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Fecha_Nacimiento: new Date(),
        Telefono: '',
        Correo: '',
        Contrasena: '',
        Intentos:0,
        Peso: 0,
        Estatura: 0,
        Apodo: '',
        Partidos_Jugados: 0,
        Partidos_Jugador_Futplay: 0,
        Partidos_Jugador_Del_Partido : 0,
        Compartir_Datos : false,
        Avatar: true,
        Pais:'CR',
        Cod_Pais:'+506'
      };
      this.confirmarContrasena ='';
      this.showPass = false;
      this.showPassConfirm = false;
      this.showCanton = null;
      this.showDistrito = null;
    
    }
  }) 


}


async SelectDate(){
  if (!this.modalOpen){
    this.modalOpen = true;
    const modal = await this.modalCrtl.create({
      component:SeleccionarFechaPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      cssClass:'medium-modal',
      mode:'ios',
      componentProps:{
        title:'Fecha de nacimiento',
        id: 'seleccionar-fecha',
        fecha:new Date(this.usuario.Fecha_Nacimiento)
      }     
    }) 
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data !== undefined ){
     this.usuario.Fecha_Nacimiento =  data.date
     this.modalOpen = false;
    }else{
    this.modalOpen = false;
    }  
  }
  
}

registro(fRegistro: NgForm){
  let registro = fRegistro.value;
  console.log('registro', registro)
  if(fRegistro.invalid ) {
this.alertasService.message('FUTPLAY','Verifica que ambas contraseñas sean las mismas!')
return;
  }

  return;
this.usuario.Contrasena = this.ingresarContrasena;    
this.usuario.Cod_Pais = this.usuario.Pais == 'CR' ? '+506' : '+1';
this.usuariosServicio.registro(this.usuario)
  
  }
  

async onChangeProvincias(fRegistro:NgForm,$event){
  let registro = fRegistro.value;
  this.alertasService.presentaLoading('Cargando datos...')
  this.usuario.Cod_Canton = null;
  this.usuario.Cod_Distrito = null;
  this.cantonesService.cantones = [];
  this.distritosService.distritos = [];
if(registro.Cod_Provincia){

  let cantones = await this.cantonesService.syncCantonesToPromise(registro.Cod_Provincia);

  cantones.forEach((canton:Cantones, index)=>{
 
let data  = {
  id : canton.Cod_Provincia,
  valor: canton.Canton
}
console.log(data,'data')
this.dataCantones.push(data)
    if(index == cantones.length -1){
      this.showCanton = true;
      this.showDistrito = null;
      this.alertasService.loadingDissmiss();
    }
  })
 
}else{
this.alertasService.loadingDissmiss();
}
}
onChangeCantones(fRegistro:NgForm,$event){
  let registro = fRegistro.value;
  this.alertasService.presentaLoading('Cargando datos...')
  this.usuario.Cod_Canton = $event.target.value;
  this.usuario.Cod_Distrito = null;
  this.distritosService.distritos = [];
if(this.usuario.Cod_Provincia && this.usuario.Cod_Canton){
this.distritosService.syncDistritos( this.usuario.Cod_Canton).then(resp =>{
  this.distritosService.distritos = resp.slice(0);
  this.showDistrito = true;
  this.alertasService.loadingDissmiss();
  
})
}else{
this.alertasService.loadingDissmiss();
}

}

onChangeDistritos($event){
this.usuario.Cod_Distrito = $event.target.value;
}





 

}
