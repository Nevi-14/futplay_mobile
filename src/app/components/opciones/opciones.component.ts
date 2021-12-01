import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpcionesService } from 'src/app/services/opciones.service';
import { ClubInfoComponent } from '../club-info/club-info.component';
interface opcionesArray{
funcion:string,
icono: string,
arreglo: any,
parametros: any,
boton: string
}
@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss'],
})
export class OpcionesComponent implements OnInit {
@Input() titulo: string;
@Input() opciones: opcionesArray[]=[];
  constructor(public modalCtrl: ModalController, public opcionesService: OpcionesService) { }

  ngOnInit() {

 this.opciones.forEach(item =>{
   console.log(item)
 })

  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }




}
