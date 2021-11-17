import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClubService } from 'src/app/services/club.service';
import { RetosService } from '../../services/retos.service';
import { ClubInfoComponent } from '../../components/club-info/club-info.component';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.page.html',
  styleUrls: ['./sent.page.scss'],
})
export class SentPage implements OnInit {


  constructor( public modalCtrl: ModalController, public retos: RetosService, public clubs: ClubService) { }

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
