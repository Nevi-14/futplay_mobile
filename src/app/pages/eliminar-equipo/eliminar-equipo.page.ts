import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReservacionesService } from '../../services/reservaciones.service';
import { EquiposService } from '../../services/equipos.service';
import { format } from 'date-fns';
import { AlertasService } from '../../services/alertas.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-eliminar-equipo',
  templateUrl: './eliminar-equipo.page.html',
  styleUrls: ['./eliminar-equipo.page.scss'],
})
export class EliminarEquipoPage implements OnInit {

  constructor(
public modalCtrl: ModalController,
public reservacionesService:ReservacionesService,
public equiposService: EquiposService,
public alertasService: AlertasService,
public usuariosService: UsuariosService

  ) { }

  ngOnInit() {
  }
  cerrarModal(){

    this.modalCtrl.dismiss();

  }
  eliminarEquipo(){

    this.reservacionesService.syncGetReservcionesFuturas(this.equiposService.equipo.equipo.Cod_Equipo, format(new Date(), 'yyy-MM-dd')).then(resp =>{


      if(resp.length > 0){
        this.alertasService.message('FUTPLAY', 'Debes de cancelar todas las reservaciones antes de poder eliminar un equipo o esperar a que finalice la revisión de las mismas por el equipo FUTPLAY.')

      }else{
this.equiposService.syncDeleteEquipo(this.equiposService.equipo.equipo.Cod_Equipo).then( resp =>{

  this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp =>{

    this.equiposService.misEquipos = resp;
    this.equiposService.equipo = resp[0];
    this.alertasService.message('FUTPLAY', 'Equipo Eliminado')
    this.modalCtrl.dismiss(true)
  })



})

      }

    })

    
  }
}
