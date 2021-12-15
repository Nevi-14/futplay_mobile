import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReservacionesService } from 'src/app/services/reservaciones.service';

@Component({
  selector: 'app-retos-template',
  templateUrl: './retos-template.component.html',
  styleUrls: ['./retos-template.component.scss'],
})
export class RetosTemplateComponent implements OnInit {

  constructor(public modalCtrl: ModalController, public retosService: ReservacionesService) { }

  ngOnInit() {
console.log(this.retosService.eventos);

  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
