import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    usuarioID: null,
    roleID: null,
    provinciaID: null,
    cantonID: null,
    distritoID:null,
    foto:'',
    nombre:'',
    apellido1:'',
    apellido2:'',
    fechaNac: new Date(),
    telefono:'',
    direccion:'',
    correo:'',
    contrasena: '',
    intentos: 0
  };
  constructor(private userService: UserService, private route: Router, private toastCtrl: ToastController ) { }

  ngOnInit() {
  }
  async  test(){
    const toast = await this.toastCtrl.create({
      message:'Usuario o contraseña incorrectos',
      duration: 1000,
      position: 'bottom'
      });
         toast.present();
  }
   onSubmit(formulario: NgForm){
    const i = this.userService.user.findIndex( d => d.correo === this.user.correo );
    console.log(i);
    if ( i >= 0 ){
      if ( this.userService.user[i].contrasena === this.user.contrasena ){
        this.userService.loggedUser(this.userService.user[i]);
        this.route.navigate(['/', 'home']);
      } else {
        this.test();
      }
    } else {
      this.test();
    }

}

}
