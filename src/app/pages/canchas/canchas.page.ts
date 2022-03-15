import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage implements OnInit {
  soccer= 'assets/icon/soccer.svg';
  constructor(
    public canchasService: CanchasService,
    public modalCtrl: ModalController
  ) { 
    this.canchasService.syncCanchas()
  }
  
  cerrarModal(){
    this.modalCtrl.dismiss();
      }

  seleccionar(cancha){
    this.modalCtrl.dismiss({

      data:  cancha
     });
  }


  ngOnInit() {
  }

}
