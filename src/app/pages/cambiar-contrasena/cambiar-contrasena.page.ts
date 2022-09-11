import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
contrasena = '';
confirmarContrasena='';
  constructor(
 public modalCtrl: ModalController,
 public alertasService: AlertasService  
  ) { }

  ngOnInit() {
  }


  sendPassword(){
    if(!this.contrasena || !this.confirmarContrasena ){
      this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!.');
      return
    }
if(this.contrasena != this.confirmarContrasena){

this.alertasService.message('FUTPLAY','Ambas contraseñas deben de coincidir!.')
  return
}
    this.modalCtrl.dismiss({contrasena:this.contrasena})
  }
}
