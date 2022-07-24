import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { Usuarios } from 'src/app/models/usuarios';
import { AlertasService } from 'src/app/services/alertas.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';
import * as bcrypt from 'bcryptjs';  // npm install bcryptjs --save  &&  npm install @types/bcrypt --save-dev
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  private modalOpen:boolean = false;
  public tipos  =[{nombre:'1',valor:'general'},{nombre:'2',valor:'cumpleanos'},{nombre:'3',valor:'seguridad'}];
  public selectedType: string ='general';

// MONTHS ARE ALWAYS THE SAME

  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
days = [];
years = [];
selectedYear = new Date().getFullYear();
selectedMonth: string;
selectedDay:number;
previousDay:number;
usuario: Usuarios = {
  Cod_Usuario:0,
  Cod_Provincia: null,
  Cod_Canton : null,
  Cod_Distrito : null,
  Cod_Posicion: 1,
  Cod_Role: 2,
  Modo_Customizado: false,
  Foto: 'user.svg',
  Nombre: '',
  Primer_Apellido: '',
  Segundo_Apellido: '',
  Fecha_Nacimiento: new Date(),
  Telefono: '',
  Correo: '',
  Contrasena: '',
  FechaRegistro : new Date(),
  Intentos:0,
  Estatura: 0,
  Peso: 0,
  Apodo: '',
  Partidos_Jugados: 0,
  Partidos_Jugador_Futplay: 0,
  Avatar: true

};
confirmarContrasena ='';
showPass = false;
showPassConfirm = false;
provincia = null;
canton: null;
distrito: null;
showCanton = null;
showDistrito = null;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  protected isModalIsOpen:boolean=false;



  constructor(
    private route: Router,
    public usuariosServicio : UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCrtl: ModalController,
    public alertasService: AlertasService
  ) { }

  ngOnInit() {

  
  
  }
  formatDate(value: string) {
    //  this.usuario.Fecha_Nacimiento = $event.detail.value;

    return format(new Date(value), 'yyyy-MM-dd') ;
    
  }

  ionViewWillEnter(){
    
    this.limpiarDatos()
  
}
limpiarDatos(){
  this.provinciasService.syncProvincias();
  this.usuario = {
    Cod_Usuario:0,
    Cod_Provincia: null,
    Cod_Canton : null,
    Cod_Distrito : null,
    Cod_Posicion: 1,
    Cod_Role: 2,
    Modo_Customizado: false,
    Foto: 'user.svg',
    Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Fecha_Nacimiento: new Date(),
    Telefono: '',
    Correo: '',
    Contrasena: '',
    FechaRegistro : new Date(),
    Intentos:0,
    Estatura: 0,
    Peso: 0,
    Apodo: '',
    Partidos_Jugados: 0,
    Partidos_Jugador_Futplay: 0,
    Avatar: true,
 

  
  };
  this.confirmarContrasena ='';
  this.showPass = false;
  this.showPassConfirm = false;
  this.showCanton = null;
this.showDistrito = null;



}


    
  registro(fRegistro: NgForm){
    if(fRegistro.invalid || this.confirmarContrasena != this.usuario.Contrasena) {

this.alertasService.message('FUTPLAY','Verifica que ambas contraseñas sean las mismas!')
return;

    }
    console.log(fRegistro.valid);
    console.log(this.usuario)
    this.usuariosServicio.registro(this.usuario)
    
    }
    


  onChangeProvincias($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.usuario.Cod_Provincia = $event.target.value;
    this.usuario.Cod_Canton = null;
    this.usuario.Cod_Distrito = null;
    this.cantonesService.cantones = [];
    this.distritosService.distritos = [];
 if(this.usuario.Cod_Provincia){
  this.cantonesService.syncCantones(this.usuario.Cod_Provincia).then(resp =>{
this.showCanton = true;
this.showDistrito = null;
this.cantonesService.cantones = resp.slice(0);
this.alertasService.loadingDissmiss();
  })
 }else{
  this.alertasService.loadingDissmiss();
 }
  }
  onChangeCantones($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.usuario.Cod_Canton = $event.target.value;
    this.usuario.Cod_Distrito = null;
    this.distritosService.distritos = [];
if(this.usuario.Cod_Provincia && this.usuario.Cod_Canton){
  this.distritosService.syncDistritos(this.usuario.Cod_Provincia,this.usuario.Cod_Canton).then(resp =>{
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

  onChange($event , provincia, canton, distrito){
    if(provincia){
  
   this.cantonesService.syncCantones($event.target.value);
    }else if(canton){
  
      this.distritosService.syncDistritos(this.usuario.Cod_Provincia, $event.target.value);
  
    }else{
      
    }
    console.log($event.target.value);
    }





async SelectDate(){
  if (!this.modalOpen){
    this.modalOpen = true;
    const modal = await this.modalCrtl.create({
      component:SeleccionarFechaPage,
      cssClass:'medium-modal',
      mode:'ios',
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      componentProps:{
        title:'Fecha de nacimiento',
        id: 'seleccionar-fecha',
        fecha:this.usuario.Fecha_Nacimiento
      }
    })
  
    await modal.present();
    const { data } = await modal.onWillDismiss();
 
    if(data !== undefined ){
      console.log(data,'data')
     this.usuario.Fecha_Nacimiento = data.date
          this.modalOpen = false;
    }else{
 
           this.modalOpen = false;
    }
    
  }

  
}




  segmentChanged(event:any){
    console.log(event)
    
    this.selectedType = event.detail.value;
      }


      regresar(){
        this.route.navigate(['/inicio-sesion'])
      }


}
