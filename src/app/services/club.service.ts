import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  club:  Club[]=[];
  constructor( private http: HttpClient) { }

  getClubs(){
    this.http.get<Club[]>('/assets/json/clubs.json').subscribe(resp=>{
    if(resp){
     this.club = resp;
    }else{
      console.log('Error clubes roles');
    }
   });
 }

}
