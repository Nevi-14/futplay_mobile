import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-codigo-seguridad',
  templateUrl: './codigo-seguridad.page.html',
  styleUrls: ['./codigo-seguridad.page.scss'],
})
export class CodigoSeguridadPage implements OnInit {
  codigo = '';
  constructor(
    public modalCtrl: ModalController,
    public alertasService: AlertasService
  ) { }

  ngOnInit() {
  }

  confirmar(){
    if(!this.codigo ){
      this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!.');
      return
    }

    this.modalCtrl.dismiss({codigo:this.codigo})
  }
}
