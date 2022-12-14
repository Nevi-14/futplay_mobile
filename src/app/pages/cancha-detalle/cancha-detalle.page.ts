import { Component, Input, OnInit } from '@angular/core';
import { CanchasService } from 'src/app/services/canchas.service';
import { PerfilCancha } from '../../models/perfilCancha';
import { ModalController } from '@ionic/angular';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';

@Component({
  selector: 'app-cancha-detalle',
  templateUrl: './cancha-detalle.page.html',
  styleUrls: ['./cancha-detalle.page.scss'],
})
export class CanchaDetallePage implements OnInit {
@Input() cancha :PerfilCancha

  constructor(
public canchasService:CanchasService,
public modalCtrl: ModalController
  ) { }
  ngOnInit() {
 console.log(this.cancha, 'cancha')
 this.canchasService.cancha =  this.cancha ;
    this.canchasService.dia = this.diaSemana(new Date().getDay());
    
        
      }
    
      diaSemana(index) {
        return this.canchasService.diaSemana(index);
      }

      disponibilidadCancha(cancha:PerfilCancha) {
        return  this.canchasService.disponibilidadCancha(cancha);
        
      }

      horarioCancha(cancha:PerfilCancha){
      return  this.canchasService.horarioCancha(cancha);
      }


      disponibilidadReservacion(){
        return  this.canchasService.disponibidadReservacion(this.cancha);

      }
      navigate(){
        this.canchasService.navigate();
      }
 cerrarModal(){
  this.modalCtrl.dismiss();
 }

async canchaReservacion(cancha){
  this.cerrarModal()
  const modal  = await this.modalCtrl.create({
    component: GenerarReservacionPage,
   cssClass: 'my-custom-class',
   componentProps:{
    rival:null,
    retador:null,
    cancha:cancha

   },
   id:'my-modal-id'
 });
 await modal .present();
 }

 
  
}
