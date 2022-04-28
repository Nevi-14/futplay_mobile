import { ChangeDetectionStrategy, ChangeDetectorRef,Component, Input, OnInit } from '@angular/core';
import { CanchaReservacionesService } from 'src/app/services/cancha-reservaciones.service';
import { CanchasReservacionesService } from 'src/app/services/canchas-reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { DisponibilidadReservacionService } from 'src/app/services/disponibilidad-reservacion.service';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';


@Component({
  selector: 'app-editar-reservacion',
  templateUrl: './editar-reservacion.page.html',
  styleUrls: ['./editar-reservacion.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarReservacionPage implements OnInit {
@Input() reservacion;
editarReservacion = {
  Cod_Reservacion : '',
  Cod_Cancha:  null,
  Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
  Reservacion_Externa: true,
  Titulo: '',
  Fecha:   '',
  Hora_Inicio:  '',
  Hora_Fin:'',
  Estado:  true,
  diaCompleto:  false,
  Descripcion: ''
 }


 valor = this.editarReservacion.diaCompleto ? 'SI' : 'NO';
  constructor(
    public canchaReservacionesService: CanchaReservacionesService,
    public canchasReservacionesService:CanchasReservacionesService,
    public usuariosService:UsuariosService,
    public modalCtrl: ModalController,
    public disponibilidadReservacionService: DisponibilidadReservacionService,
    private cdRef:ChangeDetectorRef,
    public generrReservacionService: GenerarReservacionService
    
  ) { }

  ngOnInit() {
    this.editarReservacion.Cod_Cancha =  this.reservacion.Cod_Cancha;
        this.editarReservacion.Cod_Cancha = this.reservacion.Cod_Cancha;
    
console.log(this.reservacion)
  
    this.canchaReservacionesService.syncReservacionesFecha(this.reservacion.Cod_Cancha,this.reservacion.fecha);
    this.editarReservacion.Fecha = this.reservacion.fecha ; 
    
    this.editarReservacion.Titulo = this.reservacion.title ; 
    this.editarReservacion.Descripcion = this.reservacion.desc ; 

    this.editarReservacion.Hora_Inicio = this.reservacion.Hora_Inicio;
    this.editarReservacion.Hora_Fin = this.reservacion.Hora_Fin 
    this.editarReservacion.diaCompleto = this.reservacion.allDay  ?    this.reservacion.allDay  : false;


    this.editarReservacion.Cod_Reservacion = this.reservacion.id;

    this.generrReservacionService.generarReservacion(this.reservacion.Cod_Cancha,new Date(this.generrReservacionService.formatoFecha(this.reservacion.fecha,'/')));

  }
  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }
  

delete(){


this.canchasReservacionesService.deleteReservacion(this.editarReservacion.Cod_Reservacion);
  console.log(this.editarReservacion); 
  this.reset();
this.close();
}

reset(){

  this.editarReservacion = {
    Cod_Reservacion : '',
    Cod_Cancha: 0,
    Cod_Usuario: 0,
    Reservacion_Externa: false,
    Titulo: '',
    Fecha: '',
    Hora_Inicio: null,
    Hora_Fin:  null,
    Estado: false,
    diaCompleto: false,
    Descripcion: ''
  };


}
  close(){

    this.modalCtrl.dismiss();

  }

save() {
  console.log(this.editarReservacion);

  let i = this.generrReservacionService.horasdiaConsulta.findIndex(hora => hora.hora_inicio == this.generrReservacionService.horaSeleccionada);
let hora_i = null,
    hora_f = null;
  if( i>=0){
hora_i = this.generrReservacionService.horasdiaConsulta[i].hora_inicio
hora_f = this.generrReservacionService.horasdiaConsulta[i].hora_fin
  }
  let editarReservacion = {
    Cod_Cancha:  this.reservacion.Cod_Cancha,
    Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: this.editarReservacion.Reservacion_Externa,
    Titulo: this.editarReservacion.Titulo,
    Fecha:  this.editarReservacion.Fecha,
    hora_Inicio:hora_i,
    hora_Fin:hora_f,
    Estado:  this.editarReservacion.Estado,
    diaCompleto:  this.editarReservacion.diaCompleto,
    Descripcion: this.editarReservacion.Descripcion
   }
  this.canchasReservacionesService.actualizarReservacion(editarReservacion, this.editarReservacion.Cod_Usuario, this.editarReservacion.Cod_Reservacion);
this.close();

}

switch(value){
  value ? this.valor = 'SI' : this.valor = 'NO';
  console.log(value)
}



    

  cerrarModal(){
    this.modalCtrl.dismiss();
  }




}
