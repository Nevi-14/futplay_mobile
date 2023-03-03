import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  @ViewChild(IonSegment) segment: IonSegment;
  opcionesMenu =[{tab:'sobre-nosotros',name:'Futplay', icon:'futbol'},{tab:'inicio-sesion',name:'Iniciar', icon:'user-alt'},{tab:'registro',name:'Registro', icon:'user-plus'}];
  constructor() { }


}
