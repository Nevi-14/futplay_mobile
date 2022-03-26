import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPass = false;
  loginUser = {
    email: '',
    password: ''
    
    }
    
  constructor(public usuariosServicio: UsuariosService) { }

  ngOnInit() {
  }
  login(fLogin: NgForm){

    if(fLogin.invalid) {return;}
  console.log(fLogin.valid);
  
  this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);
  
  
  }

  loginDetails(){

    this.loginUser.email = 'workemailnelson@gmail.com';
    this.loginUser.password = 'W3lcomeAb0ard!'
  }
}
