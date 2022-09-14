import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  correo = '';
  constructor(
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public usuariosService: UsuariosService
  ) { }

  ngOnInit() {
  }
  confirmar(){
    if(!this.correo ){
      this.alertasService.message('ALERTA','Todos los campos son obligatorios!.');
      return
    }
    this.usuariosService.syncGetUserToPromise(this.correo).then(usuario =>{

      if(usuario[0]){
        this.modalCtrl.dismiss({usuario:usuario[0]})
      }else{
        this.modalCtrl.dismiss()
     this.alertasService.message('FUTPLAY', 'Lo sentimos, algo salio mal!.')
      }
    }, error =>{
      this.alertasService.message('FUTPLAY', 'Lo sentimos, algo salio mal!.')
    });

  
  }
}
