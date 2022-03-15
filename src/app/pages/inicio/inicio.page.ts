import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  @ViewChild(IonSegment) segment: IonSegment;
  opcionesMenu =[{tab:'about',name:'Futplay', icon:'futbol'},{tab:'login',name:'Iniciar', icon:'user-alt'},{tab:'register',name:'Registro', icon:'user-plus'}];

  number = 0;
  constructor() { }


 

}
