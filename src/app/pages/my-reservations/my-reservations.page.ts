import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReservacionesService } from '../../services/reservaciones.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { CanchasService } from '../../services/canchas.service';
import { EquipoReservacionPage } from '../equipo-reservacion/equipo-reservacion.page';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { GestionRetosService } from '../../services/gestion-retos.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';


@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {
  stadiumProfile =  'assets/main/game-match.jpeg';
  img1 = '../assets/icons/ball.svg';
  img2 = '../assets/icons/time.svg';
  img3 = '../assets/icons/eye.svg';
  public tipos : string[]=['confirmados','recibidos','enviados'];
  public selectedType: string = this.tipos[0];
cancha = null;
retador = null;

rival = null;
constructor(public modalCtrl: ModalController, public retos: ReservacionesService, public clubs: EquiposService,public router: Router,
    
    public equiposService: EquiposService,
    public canchasService: CanchasService,
    public usuariosService:UsuariosService,
    public gestionRestosService:GestionRetosService
    ) { }

  ngOnInit() {
 
  }
  async detalleReto(reto) {
let mostrarModal = false;



    const consultarCancha = this.canchasService.syncCodCancha(reto.Cod_Cancha);
    consultarCancha.then(resp =>{
this.cancha = resp[0]
console.log(this.cancha,'caaa',resp)
const consultarRetador = this.equiposService.syncEquipo(reto.Cod_Retador);

consultarRetador.then(resp =>{

this.retador = resp[0];

console.log(this.retador,'rival')

const consultarRival = this.equiposService.syncEquipo(reto.Cod_Rival);


consultarRival.then(resp =>{
  this.rival = resp[0];

  mostrarModal = true;
if(mostrarModal){
  console.log(reto,this.cancha,this.retador,null,resp,'reto,cancha,rival,null,resp')

}

this.detalleRetoModal(reto,this.cancha,this.retador,this.rival)
})


})


    })

    

  



  
  }


  async detalleRetoModal(reto,cancha,retador,rival){
    const modal = await this.modalCtrl.create({
      component: AceptarRetoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto,
        cancha: cancha,
        retador: retador,
        rival:rival
      }
    });

    return await modal.present();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }


  async nuevaReservacion(){

  
     
    const modal  = await this.modalCtrl.create({
     component: EquipoReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      rival:null,
      retador:null,
      cancha:null

     }
   });
   await modal .present();
 }

  segmentChanged(event:any){
    console.log(event)
    

    this.selectedType = event.detail.value;
    console.log(event.detail.value)
if(event.detail.value == 'recibidos'){
  
  this.gestionRestosService.syncRetosRecibidos(this.usuariosService.usuarioActual.Cod_Usuario)
}else if (event.detail.value == 'enviados'){
  
  this.gestionRestosService.syncRetosEnviados(this.usuariosService.usuarioActual.Cod_Usuario)
}else{
  this.gestionRestosService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
}
      }

      hours(dater: Date, hours) {

        const d = new Date(dater)
     //  alert (d)
    // console.log( d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+' '+ hours)
        return d.getFullYear()+'/'+d.getMonth()+1+'/'+d.getDate()+' '+ hours;
     }
     formatDate(date) {
      return (
        [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
          this.padTo2Digits(date.getHours()),
          this.padTo2Digits(date.getMinutes()),
          this.padTo2Digits(date.getSeconds()),
        ].join(':')
      );
    }

    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }


}
