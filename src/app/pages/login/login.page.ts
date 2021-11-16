import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { JugadoresPosicionesService } from 'src/app/services/jugador-posiciones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin = {
    usuario: '',
    contrasena: '',
    intentos: 0
  };

  showPass = false;

  constructor(public userService: UserService, public route: Router, public alertCtrl: AlertController , public jugadorPosicion: JugadoresPosicionesService ) { }

  ngOnInit() {
  }
  async message( text: string){
    const alert = await this.alertCtrl.create({
      header: 'Futplay',
      message: text,
    });
    alert.present();
  }


   onSubmit(formulario: NgForm){
    let  i = 0;
if(this.userService.validateEmail(this.removeSpaces(this.userLogin.usuario))=== false){
    i = this.userService.user.findIndex( d => d.telefono === this.removeSpaces(this.userLogin.usuario ));
}else{
    i = this.userService.user.findIndex( d => d.correo === this.removeSpaces(this.userLogin.usuario ) );

}

    if ( i >= 0 ){
      if ( this.userService.user[i].contrasena === this.userLogin.contrasena ){
        this.userService.loggedUser(this.userService.user[i]);
        this.userService.swapUser(this.userService.user[i].usuarioID)
        console.log(this.userService.userProfile)
        this.route.navigate(['/', 'home']);
      } else {
       this.message('Usuario o contraseña incorrectos');
      }
    } else {
      this.message('Usuario o contraseña incorrectos');
    }
    const user = {
      usuario: '',
      contrasena: '',
      intentos: 0
    };
  
    this.userLogin = user;

}
removeSpaces(element:string) {
  return element.split(' ').join('');
 }
}
