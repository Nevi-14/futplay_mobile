import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Canchas } from 'src/app/models/canchas';
import { HorarioCanchasService } from '../../services/horario-canchas.service';
import { ListaCanchas } from '../../models/listaCanchas';

@Component({
  selector: 'app-cancha-detalle',
  templateUrl: './cancha-detalle.page.html',
  styleUrls: ['./cancha-detalle.page.scss'],
})
export class CanchaDetallePage implements OnInit {
  img = 'assets/main/stadium-profile.svg';
@Input() cancha: ListaCanchas

  constructor(
    public modalCtrl: ModalController,
    public horarioCanchasService: HorarioCanchasService,
    public actionCtrl: ActionSheetController
  ) { }

  ngOnInit() {

    this.horarioCanchasService.syncHorarioCanchas(this.cancha.Cod_Cancha)
 
    console.log(this.cancha,   this.horarioCanchasService.horarioCancha)
  }

  cerrarModal(){
this.modalCtrl.dismiss();
  }
   tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  horario(){


  }


  reservarCancha(){
    
  }


  async navigate() {
     
    //Kuala Lumpur City Center coordinates
    let toLat= this.cancha.Latitud;
    let toLong= this.cancha.Longitud;

    
    let destination = toLat + ',' + toLong;


    //1. Declaring an empty array
    let actionLinks=[];

    //2. Populating the empty array

     //2A. Add Google Maps App
    actionLinks.push({
      text: 'Google Maps App',
      icon: 'navigate',
      handler: () => {
        window.open("https://www.google.com/maps/search/?api=1&query="+destination)
      }
    })

   
     //2B. Add Waze App
    actionLinks.push({
      text: 'Waze App',
      icon: 'navigate',
      handler: () => {
        window.open("https://waze.com/ul?ll="+destination+"&navigate=yes&z=10");
      }
    });

   //2C. Add a cancel button, you know, just to close down the action sheet controller if the user can't make up his/her mind
    actionLinks.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // console.log('Cancel clicked');
      }
    })
    

    

     const actionSheet = await this.actionCtrl.create({
     header: 'Navigate',
     buttons: actionLinks
   });
   await actionSheet.present();
}















}
