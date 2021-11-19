import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  @ViewChild(IonSegment) segment: IonSegment;
  opcionesMenu =[{tab:'about',name:'Futplay', icon:'football'},{tab:'login',name:'Iniciar Sessión', icon:'person'},{tab:'register',name:'Registro', icon:'person-add'}];
  constructor(public data: DataService) { }


 

}
