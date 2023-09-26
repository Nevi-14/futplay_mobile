import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { environment } from 'src/environments/environment';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { FinalizarReservacionPage } from '../finalizar-reservacion/finalizar-reservacion.page';

@Component({
  selector: 'app-retos-recibidos',
  templateUrl: './retos-recibidos.page.html',
  styleUrls: ['./retos-recibidos.page.scss'],
})
export class RetosRecibidosPage implements OnInit {
reservaciones:PerfilReservaciones[]=[];
url = environment.archivosURL;
isModalOpen:boolean = false;
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService,
public modalCtrl:ModalController,
public canchasService:CanchasService,
public equiposService:EquiposService


  ) { }

  ngOnInit() {
this.retosRecibidos()
  }
  retosRecibidos(){
    this.reservacionesService.syncgGtReservacionesRecibidas(this.usuariosSErvice.usuarioActual.Cod_Usuario).then(reservaciones=>{
      this.reservaciones = reservaciones;
          })
  }

  async finalizarReservacion(reto:PerfilReservaciones) {
    let cancha =  await this.canchasService.syncGetPerfilCanchaToPromise(reto.cancha.Cod_Cancha);
    let rival = await this.equiposService.syncGetPerfilEquipoToPromise(reto.rival.Cod_Equipo);
    let retador = await  this.equiposService.syncGetPerfilEquipoToPromise(reto.retador.Cod_Equipo);
   // this.regresar();
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: FinalizarReservacionPage,
        cssClass: 'my-custom-modal',
        mode: 'md',
        componentProps: {
          cancha: cancha[0],
          nuevaReservacion: reto.reservacion,
          detalleReservacion: reto.detalle,
          rival: rival[0],
          retador: retador[0],
          efectuarPago: true,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {
      }
    }
  }
  async detalleReto(reto:PerfilReservaciones) {

  
      const modal = await this.modalCtrl.create({
        component: AceptarRetoPage,
        cssClass: 'my-custom-class',
        componentProps: {
          reto: reto,
          aceptar:true
        }
      });
  
       await modal.present();
    let {data} = await modal.onDidDismiss();
    this.retosRecibidos();
    }
}
