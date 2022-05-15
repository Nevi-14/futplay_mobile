import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { GestionRetosService } from 'src/app/services/gestion-retos.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';

@Component({
  selector: 'app-mis-reservaciones',
  templateUrl: './mis-reservaciones.page.html',
  styleUrls: ['./mis-reservaciones.page.scss'],
})
export class MisReservacionesPage implements OnInit {

  stadiumProfile =  'assets/main/game-match.svg';
  img1 = '../assets/icons/ball.svg';
  img2 = '../assets/icons/time.svg';
  img3 = '../assets/icons/eye.svg';
  public tipos : string[]=['confirmados','recibidos','enviados'];
  public selectedType: string = this.tipos[0];
  categories = ['Confirmados', 'Recibidos','Enviados','Historial'];
  opts = {
    freeMode:true,
    slidesPerView: 2.8,
    slidesOffsetBefore:30,
    slidesOffsetAfter:100
  }
  activeCategory = 0;
cancha = null;
retador = null;
Titulo = '';
show = false;
showImage = false;
rival = null;
showSend = false;
showReceive = true;
showConfirm = false;
constructor(
  public modalCtrl: ModalController, 
  public retos: ReservacionesService,
   public clubs: EquiposService,
   public router: Router,
    
    public equiposService: EquiposService,
    public canchasService: CanchasService,
    public usuariosService:UsuariosService,
    public gestionRestosService:GestionRetosService
    ) { }

  ngOnInit() {
    this.gestionRestosService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
   // this.gestionRestosService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
  }
  async detalleReto(reto) {
let mostrarModal = false;



 this.canchasService.syncCodCancha(reto.Cod_Cancha).then(resp =>{
      console.log(resp, 'canaaaaa')
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
  selectCategory(index){
 this.activeCategory = index;

 switch(index){

  case 0:
    this.gestionRestosService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
  break;
  
  case 1:
    this.gestionRestosService.syncRetosRecibidos(this.usuariosService.usuarioActual.Cod_Usuario)
  break;
  
  case 2:
    this.gestionRestosService.syncRetosEnviados(this.usuariosService.usuarioActual.Cod_Usuario)
  break;
  
  case 3:

  break;

  default:
    
    break;
}


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
      component: GenerarReservacionPage,
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



    consultarRetos(index){

switch(index){

  case 0:

  break;
  
  case 1:

  break;
  
  case 2:

  break;
  
  case 3:

  break;

  default:

    break;
}

    }

reset(){
  this.Titulo = ''
this.show = false;
this.showSend = true;
this.showReceive = true;
this.showConfirm = true;
this.gestionRestosService.retos = [];
this.showImage = false;

}
    send(){
      this.Titulo = 'Enviados';
      this.show = true;
      this.showSend = true;
this.showReceive = false;
this.showConfirm = false;
this.gestionRestosService.syncRetosEnviados(this.usuariosService.usuarioActual.Cod_Usuario)
setTimeout( () => {
  this.showImage = true;

 }, 500 );

    }

    receive(){
      this.Titulo = 'Recibidos';
      this.show = true;
      this.showSend = false;
this.showReceive = true;
this.showConfirm = false;
this.gestionRestosService.syncRetosRecibidos(this.usuariosService.usuarioActual.Cod_Usuario)
setTimeout( () => {
  this.showImage = true;

 }, 500 );
    }

    confirm(){
      this.Titulo = 'Confirmados';
      this.showSend = false;
this.showReceive = false;
this.showConfirm = true;
      this.show = true;
      setTimeout( () => {
        this.showImage = true;
      
       }, 500 );
      this.gestionRestosService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
    }
}
