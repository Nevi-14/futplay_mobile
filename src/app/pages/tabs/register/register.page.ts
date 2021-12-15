import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Provincias } from 'src/app/models/provincias';
import { Usuarios } from 'src/app/models/usuarios';


@Component({selector: 'app-register', templateUrl: './register.page.html', styleUrls: ['./register.page.scss']})
export class RegisterPage implements OnInit {
    provincias : Observable < Provincias[] >;
    user = {
        usuarioID: this.userService.user.length + 1,
        roleID: 2,
        provinciaID: null,
        cantonID: null,
        distritoID: null,
        administrador: false,
        customMode: true,
        foto: '../assets/profile/nopicture.svg',
        nombre: '',
        apodo:'',
        apellido1: '',
        apellido2: '',
        fechaNac: null,
        telefono: '',
        direccion: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        intentos: 0
    };
    showPass = false;
    showPassConfirm = false;
    constructor(public userService : UsuariosService, public route : Router, public alertCtrl : AlertController) {}

    ngOnInit() {
       
    }


    async alert(email) {
      if(email){
        const alert = await this.alertCtrl.create({
            header: 'Lo sentimos!',
            message: 'Usuario duplicado. ¿Desea recuperar contraseña?',
            buttons: [
                {
                    text: 'SI',
                    handler: () => {
                        this.route.navigate(['/', 'password-reset']);
                    }
                }, {
                    text: 'NO',
                    handler: () => {
                        this.route.navigate(['/inicio/', 'login']);
                    }
                }
            ]
        });
        await alert.present();
      }else{

        const alert = await this.alertCtrl.create({
            header: 'Lo sentimos!',
            message: 'Ingresa un correo valido!'
        });
        await alert.present();
      }
    }
    async onSubmit(formulario : NgForm) {
        if(this.userService.validateEmail(this.user.correo)=== false){
             this.alert(false);
        }else{
            const i = this.userService.user.findIndex(d => d.correo === this.user.correo);
            console.log(i);
            if (i >= 0) {
                this.alert(true);
            } else {
              //  alert([this.user.confirmarContrasena, this.user.contrasena])
                if(this.user.confirmarContrasena === this.user.contrasena){
                    this.userService.loggedUser(this.user);
                    this.userService.user.push(new Usuarios(this.user.usuarioID, this.user.provinciaID, this.user.cantonID, this.user.distritoID, false,true,  this.user.nombre, this.user.apellido1, this.user.apellido2, new Date(this.user.fechaNac),this.user.foto, this.user.telefono, this.user.correo, this.user.contrasena, this.user.intentos, new Date(), 1, 'test'));
                    this.route.navigate(['/', 'home']);
                  //  this.jugadorPosicion.jugadoresPosiciones.push(new JugadorPosiciones(this.jugadorPosicion.jugadoresPosiciones.length+1,this.user.usuarioID, null,''));
                  
                    this.userService.swapUser(this.user.usuarioID)
            


                    const resetUser =  {
                        usuarioID: null,
                        roleID: null,
                        provinciaID: null,
                        cantonID: null,
                        distritoID: null,
                        administrador: false,
                        customMode: true,
                        foto: '',
                        nombre: '',
                        apodo:'',
                        apellido1: '',
                        apellido2: '',
                        fechaNac: null,
                        telefono: '',
                        direccion: '',
                        correo: '',
                        contrasena: '',
                        confirmarContrasena: '',
                        intentos: 0
                    };
                    this.user = resetUser;
                }else{
                    const alert = await this.alertCtrl.create({
                        header: 'Lo sentimos!',
                        message: 'Las contrasenas no coinciden'
                    });
                    await alert.present();
                }
               
            }

        }
   

    }


}
