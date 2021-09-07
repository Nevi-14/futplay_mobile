import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private userService: UserService, private route: Router ) { }

  ngOnInit() {
  }

  onSubmit(formulario: NgForm){
    this.userService.loggedUser(this.user);
    for(let i = 0; i < this.userService.user.length; i++){
      if(this.user.correo == this.userService.user[i].correo && this.user.contrasena == this.userService.user[i].contrasena  ){
        this.userService.loggedUser(this.userService.user[i]);
        console.log(this.userService.user[i]);
        this.route.navigate(['/', 'home']);
      }

    }
 
}

}
