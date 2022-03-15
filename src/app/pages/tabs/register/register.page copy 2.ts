import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Provincias } from 'src/app/models/provincias';
import { Usuarios } from 'src/app/models/usuarios';
import { EquiposService } from 'src/app/services/equipos.service';
import { format } from 'date-fns';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';


@Component({selector: 'app-register', templateUrl: './register.page.html', styleUrls: ['./register.page.scss']})
export class RegisterPage implements OnInit {
   
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
usuario = {
  Cod_Provincia: null,
  Cod_Canton : null,
  Cod_Distrito : null,
  Cod_Posicion: 1,
  Cod_Role: 2,
  Modo_Customizado: false,
  Foto: '',
  Nombre: '',
  Primer_Apellido: '',
  Segundo_Apellido: '',
  Fecha_Nacimiento: format(new Date(), 'yyyy-MM-dd'),
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

};

  confirmarContrasena = null;
  showPass = false;
  showPassConfirm = false;
  provincia = null;
  canton: null;
  distrito: null;
  constructor(
    private route: Router,
    public usuariosServicio : UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
  ) { }

  ngOnInit() {

    //this.selectedMonth = this.months[0];
    this.popualteYears();
    this.provinciasService.syncProvincias();
  }
  formatDate(value: string) {
    //  this.usuario.Fecha_Nacimiento = $event.detail.value;

    return format(new Date(value), 'yyyy-MM-dd') ;
    
  }


    
  registro(fRegistro: NgForm){
    if(fRegistro.invalid) {return;}
    console.log(fRegistro.valid);
    console.log(this.usuario)
    this.usuariosServicio.registro(this.usuario)
    
    }
    
  syncProvincias(){
    this.provinciasService.syncProvincias();
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






  dayonChange(selectedValue:any){
    this.previousDay =  selectedValue.detail.value;

  }

  yearonChange(selectedValue:any){
    this.popualteYears();

  }


  onSelectChange(selectedValue: any) {
  let   monthValue =  selectedValue.detail.value;

  let currentYear = this.selectedYear;


  let dayNum = 0;
  if(monthValue === 'January' || monthValue === 'March'|| monthValue === 'May' || monthValue === 'July' || monthValue === 'August' || monthValue === 'October' || monthValue === 'December'){
    dayNum = 31;
  }else if( monthValue === 'April' || monthValue === 'June' || monthValue === 'September' || monthValue === 'November'){
    dayNum = 30;
  }else{

  // CHECK FOR A LEAP YEAR

  if(new Date(currentYear, 1, 29 ).getMonth()===1){
    dayNum = 29;
  }else{
    dayNum = 28;
  }

  }

 //  INSERT THE CORRECT DAY INTO the dropdown
 this.days = [];

 for ( let i = 1; i <= dayNum; i++){

  this.days.push(i);

 }
 this.popualteYears();

  }


  popualteYears(){

    this.years = [];

    // GET THE CURRENT YEAR AS A NUMBER
    let year = this.selectedYear;
    // make the previous 100 yars be an option
    for(let i = 0; i < 101 ; i++){

      this.years.push(year-i);
      

    }
    if(this.previousDay){

    }

  }

  segmentChanged(event:any){
    console.log(event)
    
    this.selectedType = event.detail.value;
      }


      regresar(){
        this.route.navigate(['/inicio-sesion'])
      }


      populateDays(month){

      }

}
