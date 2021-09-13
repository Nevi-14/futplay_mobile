import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Provincia } from '../../models/provincia';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  provincias: Observable<Provincia[]>;
  user = {
    usuarioID: this.userService.user.length+1,
    roleID: 2,
    provinciaID:1,
    cantonID:1,
    distritoID:1,
    foto:'../assets/profile/nopicture.svg',
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
  constructor(private userService: UserService, private route: Router, private data: DataService, private toastCtrl: ToastController) { }

  ngOnInit() {
    console.log(this.data.provincias);
    console.log(this.data.cantones);
    console.log(this.data.distritos);
  }


  async  test(){
    const toast = await this.toastCtrl.create({
      message:'El usuario ya existe',
      duration: 1000,
      position: 'bottom'
      });
         toast.present();
  }
   onSubmit(formulario: NgForm){
    const i = this.userService.user.findIndex( d => d.correo === this.user.correo );
    console.log(i);
    if ( i >= 0 ){
      this.test();
    } else {
      this.userService.loggedUser(this.user);
      this.userService.user.push(
        new Usuario(this.user.usuarioID,this.user.roleID,this.user.provinciaID,this.user.cantonID,this.user.distritoID,this.user.foto,this.user.nombre,this.user.apellido1,this.user.apellido2,this.user.fechaNac,this.user.telefono,this.user.direccion,this.user.correo,this.user.contrasena,this.user.intentos)
        
        );
        this.route.navigate(['/', 'home']);
  
    }

}



}
