import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';

import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;
  @ViewChild('fLogin') loginForm: NgForm



  showPass = false;
   lock = false;

loginUser = {
email: '',
password: ''

}


  constructor(
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
public router: Router,
public usuariosServicio: UsuariosService,
public reservacionesService: ReservacionesService,
public modalCtrl: ModalController,


  ) { }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  ionViewWillEnter(){
    this.limpiarDatos()
  } 

  limpiarDatos(){

    this.lock = false;
    this.loginUser = {
      email: '',
      password: ''
      
      }
      this.showPass = false;

  }
  loginDetails(){

    this.lock = !this.lock

    if(this.lock){
      this.loginUser.email = 'workemailnelson@gmail.com';
      this.loginUser.password = 'W3lcomeAb0ard!'
    }else{
      this.loginUser.email = '';
    this.loginUser.password = ''
    }

    
  }

  ngOnInit() {

    this.loginUser = {
      email: '',
      password: ''
      
      }

  }


login(fLogin: NgForm){

  if(fLogin.invalid) {return;}
console.log(fLogin.valid);

this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);


}


}
