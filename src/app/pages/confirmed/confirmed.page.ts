import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { ClubInfoComponent } from '../../components/club-info/club-info.component';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.page.html',
  styleUrls: ['./confirmed.page.scss'],
})
export class ConfirmedPage implements OnInit {


  constructor( public modalCtrl: ModalController, public retos: ReservacionesService, public clubs: EquiposService) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  returnName(equipoID){
    const i = this.clubs.club.findIndex(c=> c.equipoID === equipoID)
    return this.clubs.club[i].nombre;
      }
      returnImage(equipoID){
        const i = this.clubs.club.findIndex(c=> c.equipoID === equipoID)
        return this.clubs.club[i].foto;
      }
      
      
  async details(reto){
    const i = this.clubs.club.findIndex(c => c.equipoID === reto.equipoID2)
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
