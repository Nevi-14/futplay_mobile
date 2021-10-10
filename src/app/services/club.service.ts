import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { HttpClient } from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  new = false
  club:  Club[]=[];
  userclubs:  Club[]=[];
  switchClub: Club;
  constructor( private http: HttpClient, private popOverCtrl: PopoverController, private user:UserService) { }

  getClubs(){
    this.http.get<Club[]>('/assets/json/clubs.json').subscribe(resp=>{
    if(resp){
     this.club = resp;
    }else{
      console.log('Error clubes roles');
    }
   });
 }
 swapClub(clubId: number){
  for(let i = 0; i < this.club.length; i++){
    if(this.club[i].clubID === clubId){
      this.switchClub = this.club[i];
      this.popOverCtrl.dismiss();
    }
   
  }


}
checkIfHasClub(){
  this.userclubs = [];
  const i = this.club.findIndex( d => d.usuarioID === this.user.currentUser.usuarioID );
  if ( i >= 0 ){
  for(let i = 0 ; i < this.club.length; i++){
    if(this.user.currentUser.usuarioID === this.club[i].usuarioID){
      
      this.userclubs.push(this.club[i]);
    }
  }
  this.switchClub = this.userclubs[0];
    this.new = true;
  } else {
    this.new = false;
  }
  console.log(this.new)
}
first(){
  for (let i in this.club) return this.club[i];
  }
}
