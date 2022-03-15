import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';

@Component({
  selector: 'app-lista-canchas',
  templateUrl: './lista-canchas.page.html',
  styleUrls: ['./lista-canchas.page.scss'],
})
export class ListaCanchasPage implements OnInit {
  soccer= 'assets/icon/soccer.svg';
  textoBuscar = '';
  constructor(
    public modalCtrl: ModalController,
    public canchasService: CanchasService

  ) { }

  ngOnInit() {

this.canchasService.syncCanchas();

    
  }

  
  retornarCancha(cancha){

    this.modalCtrl.dismiss({

      cancha:  cancha
     });

  }
  onSearchChange(event){
    this.textoBuscar = event.detail.value;
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  async canchaDetalle(cancha){


    const modal = await this.modalCtrl.create({
      component: CanchaDetallePage,
      cssClass: 'custom-class',
      backdropDismiss: true,
      swipeToClose:false,
      animated: true,
      componentProps : {
        cancha:cancha
      }

      
  
    });
  
   modal.present();



    
  }
}
