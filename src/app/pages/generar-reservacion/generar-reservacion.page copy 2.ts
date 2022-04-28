import { ChangeDetectorRef ,Component, ViewChild, OnInit, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { setTime } from '@syncfusion/ej2-angular-schedule';
import { format, parseISO } from 'date-fns';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CanchasReservacionesService } from '../../services/canchas-reservaciones.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { DisponibilidadReservacionService } from 'src/app/services/disponibilidad-reservacion.service';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';
interface horas{
  formato12:string,
  hora_inicio: string
  hora_fin: string
}
@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class GenerarReservacionPage  implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  @Input() fecha: Date;
  show = false;
  nuevaReservacion = {
    Cod_Cancha:  this.canchasReservacionesService.canchaActual.Cod_Cancha,
    Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: true,
    Titulo: 'Reservación Externa',
    Fecha:  null,
    Hora_Inicio:  null,
    Estado:  true,
    diaCompleto:  false,
    Descripcion: ''
   }
  valor = this.nuevaReservacion.diaCompleto ? 'SI' : 'NO';
  arregloHorasDisponibles :horas[]=[];
  
  constructor(
    public modalCtrl: ModalController,
    public canchasReservacionesService: CanchasReservacionesService,
    public usuariosService: UsuariosService,
    public reservacionesService: ReservacionesService,
    public disponibilidadReservacionService: DisponibilidadReservacionService,
    private cdRef:ChangeDetectorRef,
    public generrReservacionService: GenerarReservacionService
  ) { }
  

  ngOnInit() {
    this.nuevaReservacion.Fecha = this.fecha;
    this.disponibilidadReservacionService.generarArregloHorasDisponibles(this.fecha);
    this.generrReservacionService.generarReservacion(this.canchasReservacionesService.canchaActual.Cod_Cancha,this.fecha);

  }


  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  //  this.nuevaReservacion.Hora_Inicio = this.disponibilidadReservacionService.arregloHorasDisponibles[0].hora_inicio;
  }
  
  
  reset(){

    this.nuevaReservacion = {
      Cod_Cancha: 0,
      Cod_Usuario: 0,
      Reservacion_Externa: false,
      Titulo: '',
      Fecha: '',
      Hora_Inicio: '',
      Estado: false,
      diaCompleto: false,
      Descripcion: ''
    };
  

  
  }
  cerrarModal(){

    this.modalCtrl.dismiss();

  }

save() {

  let i = this.disponibilidadReservacionService.arregloHorasDisponibles.findIndex(hora => hora.hora_inicio == this.nuevaReservacion.Hora_Inicio);
let hora_i = null,
    hora_f = null;
  if( i>=0){
hora_i = this.disponibilidadReservacionService.arregloHorasDisponibles[i].hora_inicio
hora_f = this.disponibilidadReservacionService.arregloHorasDisponibles[i].hora_fin
  }
let nuevaReservacion = {

  Cod_Cancha:  this.canchasReservacionesService.canchaActual.Cod_Cancha,
  Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
  Reservacion_Externa: this.nuevaReservacion.Reservacion_Externa,
  Titulo: this.nuevaReservacion.Titulo,
  Fecha:  this.nuevaReservacion.Fecha,
  hora_Inicio:hora_i,
  hora_Fin:hora_f,
  Estado:  this.nuevaReservacion.Estado,
  diaCompleto:  this.nuevaReservacion.diaCompleto,
  Descripcion: this.nuevaReservacion.Descripcion

 }

this.reservacionesService.insertarReservacion(nuevaReservacion);


this.cerrarModal();


}

switch(value){
  value ? this.valor = 'SI' : this.valor = 'NO';
}

    


}
