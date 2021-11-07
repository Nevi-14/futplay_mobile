import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JugadorClubes } from '../models/jugadorClubes';
import { AlertController, ModalController } from '@ionic/angular';
import { ProfilePage } from '../pages/profile/profile.page';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JugadoresClubesService {

  jugadoresClubes:  JugadorClubes[]=[];
  constructor( private http: HttpClient, private modalCtrl: ModalController, private alertCtrl: AlertController, private route: Router) { }

  getJugadores(){
    this.http.get<JugadorClubes[]>('/assets/json/jugadores.json').subscribe(resp=>{
    if(resp){
     this.jugadoresClubes = resp;
     console.log(resp)
    }else{
      console.log('Error clubes roles');
    }
   });
 }

 add(usuarioID: number, clubID: number, fecha: Date, admin: boolean){
  this.jugadoresClubes.push(new JugadorClubes(this.jugadoresClubes.length+1, usuarioID,clubID,fecha,false));
 }

deletePlayer(jugadorID){
 let  i = this.jugadoresClubes.findIndex( jugadores => jugadores.jugadorID === jugadorID);
  console.log('id', jugadorID)
  console.log(this.jugadoresClubes)
  if ( i >= 0){
    this.jugadoresClubes.splice(i, 1);
    console.log('done')
  }

}
 async show(userInfo) {
  const modal = await this.modalCtrl.create({
    component: ProfilePage,
    cssClass: 'my-custom-class',
    componentProps:{
      userInfo:userInfo
     }
  });
  return await modal.present();
}

async presentAlert(message) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'FUTPLAY',
    message: message,
    buttons: ['OK']
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}


}
