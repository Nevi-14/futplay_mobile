import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JugadorClubes } from '../models/jugadorClubes';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../pages/profile/profile.page';

@Injectable({
  providedIn: 'root'
})
export class JugadoresClubesService {

  jugadoresClubes:  JugadorClubes[]=[];
  constructor( private http: HttpClient, private modalCtrl: ModalController) { }

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
  this.jugadoresClubes.push(new JugadorClubes(this.jugadoresClubes.length+1, usuarioID,clubID,fecha,true));
 }
makeAdmin(jugadorID){

 let  i = this.jugadoresClubes.findIndex( jugadores => jugadores.jugadorID === jugadorID);

 if(i >= 0 ){
   this.jugadoresClubes[i].admin === true;
   alert('El usuario se establecio como administrador')
   console.log(this.jugadoresClubes[i], 'admin request')
 }
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



}
