import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roles:  Role[]=[];
  constructor( private http: HttpClient) { }

  getRoles(){
    this.http.get<Role[]>('/assets/json/roles.json').subscribe(resp=>{
    if(resp){
     this.roles = resp;
    }else{
      console.log('Error  roles');
    }
   });
 }
}
