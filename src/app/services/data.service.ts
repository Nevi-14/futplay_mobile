
import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { Canton } from '../models/canton';
import { Distrito } from '../models/distrito';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  roles: Role[]=[];
  provincias: Provincia[] =[];
  cantones: Canton[] =[];
  distritos: Distrito[] =[];
  constructor( private http: HttpClient) { }





}
