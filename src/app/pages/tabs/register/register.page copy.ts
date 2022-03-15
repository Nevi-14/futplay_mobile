import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Provincias } from 'src/app/models/provincias';
import { Usuarios } from 'src/app/models/usuarios';
import { EquiposService } from 'src/app/services/equipos.service';


@Component({selector: 'app-register', templateUrl: './register.page.html', styleUrls: ['./register.page.scss']})
export class RegisterPage implements OnInit {
    provincias : Observable < Provincias[] >;
    user = {
        
         provinciaID: 0,
         cantonID: 0,
         distritoID: 0,
         administrador: false,
         customMode: false,
         nombre: '',
         apellido1: '',
         apellido2: '',
         fechaNac: new Date(),
         foto: '../assets/profile/nopicture.svg',
         telefono: '',
         correo: '',
         contrasena: '',
         intentos: 0,
         fecha: new Date(),
         posicion: null,
         estatura: null,
         peso: null,
         apodo: null,

    };
    confirmarContrasena = null;
    showPass = false;
    showPassConfirm = false;
    constructor(public userService : UsuariosService, public route : Router, public alertCtrl : AlertController, public equipoService: EquiposService) {}

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
/**
 *     async onSubmit(formulario : NgForm) {
        if(this.userService.validateEmail(this.user.correo)=== false){
             this.alert(false);
        }else{
            const i = this.userService.user.findIndex(d => d.correo === this.user.correo);
            console.log(i);
            if (i >= 0) {
                this.alert(true);
            } else {
              //  alert([this.user.confirmarContrasena, this.user.contrasena])
                if(this.confirmarContrasena === this.user.contrasena){
     ;
                    this.userService.user.push( new Usuarios(this.user.usuarioID, this.user.provinciaID, this.user.cantonID, this.user.distritoID, this.user.administrador, this.user.customMode, this.user.nombre, this.user.apellido1, this.user.apellido2, this.user.fechaNac, this.user.foto, this.user.telefono, this.user.correo, this.user.contrasena, this.user.intentos, this.user.fecha, this.user.posicion, this.user.estatura, this.user.peso, this.user.apodo));
                    console.log(this.userService.user, this.user,'usuario . usuarios ')
                    this.route.navigate(['/home/profile']);
                             
                    this.userService.loggedUser( new Usuarios(this.user.usuarioID, this.user.provinciaID, this.user.cantonID, this.user.distritoID, this.user.administrador, this.user.customMode, this.user.nombre, this.user.apellido1, this.user.apellido2, this.user.fechaNac, this.user.foto, this.user.telefono, this.user.correo, this.user.contrasena, this.user.intentos, this.user.fecha, this.user.posicion, this.user.estatura, this.user.peso, this.user.apodo))
                  //  this.jugadorPosicion.jugadoresPosiciones.push(new JugadorPosiciones(this.jugadorPosicion.jugadoresPosiciones.length+1,this.user.usuarioID, null,''));
                  
                    this.userService.swapUser(this.user.usuarioID)
           
                    for (const key in this.user) {
                        delete this.user[key];
                      }
                      this.confirmarContrasena = null;
                 
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
 */


}
