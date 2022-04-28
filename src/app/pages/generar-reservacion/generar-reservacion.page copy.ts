import { Component, ViewChild, OnInit } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { setTime } from '@syncfusion/ej2-angular-schedule';
import { format, parseISO } from 'date-fns';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CanchasReservacionesService } from '../../services/canchas-reservaciones.service';
@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
})
export class GenerarReservacionPage  implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue1 =  new Date().getHours() + ':00:00'
  dateValue2 = new Date().getHours() +1 + ':00:00'
  nuevaReservacion = {
    Cod_Cancha:  this.canchasReservacionesService.canchaActual.Cod_Cancha,
    Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: true,
    Titulo: '',
    Fecha:   '',
    Hora_Inicio: this.dateValue1,
    Hora_Fin:this.dateValue2,
    Estado:  true,
    diaCompleto:  false,
    Descripcion: ''
   }
  valor = this.nuevaReservacion.diaCompleto ? 'SI' : 'NO';
  constructor(
    public modalCtrl: ModalController,
    public canchasReservacionesService: CanchasReservacionesService,
    public usuariosService: UsuariosService
  ) { }


  ngOnInit() {

    this.reset();  

  }
  reset(){

    this.nuevaReservacion = {
      Cod_Cancha: 0,
      Cod_Usuario: 0,
      Reservacion_Externa: false,
      Titulo: '',
      Fecha: '',
      Hora_Inicio: this.dateValue1,
      Hora_Fin:  this.dateValue2,
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
