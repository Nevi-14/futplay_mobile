import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Usuario} from 'src/app/models/usuario';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {Provincia} from '../../../models/provincia';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import { JugadoresPosicionesService } from 'src/app/services/jugador-posiciones.service';
import { JugadorPosiciones } from 'src/app/models/jugadorPosiciones';

@Component({selector: 'app-register', templateUrl: './register.page.html', styleUrls: ['./register.page.scss']})
export class RegisterPage implements OnInit {
    provincias : Observable < Provincia[] >;
    user = {
        usuarioID: this.userService.user.length + 1,
        roleID: 2,
        provinciaID: null,
        cantonID: null,
        distritoID: null,
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
    constructor(public userService : UserService, public route : Router, public data : DataService, public alertCtrl : AlertController, public jugadorPosicion: JugadoresPosicionesService) {}

    ngOnInit() {
        console.log(this.data.provincias);
        console.log(this.data.cantones);
        console.log(this.data.distritos);
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
                    this.userService.user.push(new Usuario(this.user.usuarioID, this.user.roleID, this.user.provinciaID, this.user.cantonID, this.user.distritoID, this.user.foto, this.user.nombre,this.user.apodo, this.user.apellido1, this.user.apellido2, new Date(this.user.fechaNac), this.user.telefono, this.user.direccion, this.user.correo, this.user.contrasena, this.user.intentos, new Date()));
                    this.route.navigate(['/', 'home']);
                    this.jugadorPosicion.jugadoresPosiciones.push(new JugadorPosiciones(this.jugadorPosicion.jugadoresPosiciones.length+1,this.user.usuarioID, null,''));
                  
                    this.userService.swapUser(this.user.usuarioID)
            
                    console.log(this.jugadorPosicion.jugadoresPosiciones)

                    const resetUser =  {
                        usuarioID: null,
                        roleID: null,
                        provinciaID: null,
                        cantonID: null,
                        distritoID: null,
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
