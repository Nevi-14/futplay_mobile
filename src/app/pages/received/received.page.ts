import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RetosService } from '../../services/retos.service';
import { ClubService } from '../../services/club.service';
import { ClubInfoComponent } from '../../components/club-info/club-info.component';

@Component({
  selector: 'app-received',
  templateUrl: './received.page.html',
  styleUrls: ['./received.page.scss'],
})
export class ReceivedPage implements OnInit {

  constructor( public modalCtrl: ModalController, public retos: RetosService, public clubs: ClubService ) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  returnName(clubID){
    const i = this.clubs.club.findIndex(c=> c.clubID === clubID)
    return this.clubs.club[i].nombre;
      }

      returnImage(clubID){
        const i = this.clubs.club.findIndex(c=> c.clubID === clubID)
        return this.clubs.club[i].foto;
      }
      
  async details(reto){
    const i = this.clubs.club.findIndex(c => c.clubID === reto.clubID2)
        const modal = await  this.modalCtrl.create({
          component: ClubInfoComponent,
          cssClass:'my-custom-class',
          componentProps:{
            reto: reto,
            club:this.clubs.club[i]
          }
        })
        return await modal.present();
      }
    
}
