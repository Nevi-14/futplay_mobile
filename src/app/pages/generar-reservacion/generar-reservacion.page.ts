import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
//import { CanchasReservacionesService } from '../../services/canchas-reservaciones.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
})
export class GenerarReservacionPage  implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  @Input() fecha: Date;
 hour = new Date().getHours();
  dateValue1 =  this.hour < 10 ?  '0'+ new Date().getHours() + ':00:00' : this.hour + ':00:00'
  dateValue2 =  this.hour < 10 ?  this.hour+1 < 10 ?  '0'+( this.hour+1 )+ ':00:00' : ( this.hour+1 )+ ':00:00' : this.hour + ':00:00'
  nuevaReservacion = {
    Cod_Cancha:  0,
    Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: true,
    Titulo: '',
    Fecha:  null,
    Hora_Inicio: '',
    Hora_Fin:'',
    Estado:  true,
    diaCompleto:  false,
    Descripcion: ''
   }
  valor = this.nuevaReservacion.diaCompleto ? 'SI' : 'NO';
  constructor(
    public modalCtrl: ModalController,
    //public canchasReservacionesService: CanchasReservacionesService,
    public usuariosService: UsuariosService,
    public reservacionesService: ReservacionesService
  ) { }


  ngOnInit() {
    this.reset();  
    
  //  this.nuevaReservacion.Cod_Cancha = this.canchasReservacionesService.canchaActual.Cod_Cancha;
    this.nuevaReservacion.Cod_Usuario = this.usuariosService.usuarioActual.Cod_Usuario;
    this.nuevaReservacion.Hora_Inicio =  this.dateValue1;
    this.nuevaReservacion.Hora_Fin =  this.dateValue2;

    this.nuevaReservacion.Fecha = this.fecha;

  }
  reset(){

    this.nuevaReservacion = {
      Cod_Cancha: 0,
      Cod_Usuario: 0,
      Reservacion_Externa: false,
      Titulo: '',
      Fecha: '',
      Hora_Inicio: '',
      Hora_Fin:  '',
      Estado: false,
      diaCompleto: false,
      Descripcion: ''
    };
  
    console.log('reset ', this.nuevaReservacion)
  
  }
  close(){

    this.modalCtrl.dismiss();

  }

save() {
  console.log(this.nuevaReservacion);

//this.reservacionesService.insertarReservacion(this.nuevaReservacion);

this.close();


}

switch(value){
  value ? this.valor = 'SI' : this.valor = 'NO';
  console.log(value)
}
  formatDate(value) {

if(value){
  return    value.substring(0,2)+ ':00:00';
}

  }

  setTime(date){

    if(date){
      return    date.getHours()+ ':00:00';
    }
  
}
    


}
