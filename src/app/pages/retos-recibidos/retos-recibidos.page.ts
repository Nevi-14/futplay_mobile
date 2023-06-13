import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { Reservaciones } from 'src/app/models/reservaciones';
import { PartidoService } from 'src/app/services/partido.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AceptarRetoAbiertoPage } from '../aceptar-reto-abierto/aceptar-reto-abierto.page';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';

@Component({
  selector: 'app-retos-recibidos',
  templateUrl: './retos-recibidos.page.html',
  styleUrls: ['./retos-recibidos.page.scss'],
})
export class RetosRecibidosPage implements OnInit {
reservaciones:PerfilReservaciones[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService,
public modalCtrl:ModalController,
public partidosService:PartidoService


  ) { }

  ngOnInit() {
    this.reservacionesService.syncgGtReservacionesRecibidas(this.usuariosSErvice.usuarioActual.usuario.Cod_Usuario).then(reservaciones=>{
this.reservaciones = reservaciones;
    })
  }
  async detalleReto(reto:PerfilReservaciones) {


    

    await   this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion).then(partido =>{
   
  
      console.log('partido', partido)
      
      
              })
  
  
  
  
  
      const modal = await this.modalCtrl.create({
        component: AceptarRetoPage,
        cssClass: 'my-custom-class',
        componentProps: {
          reto: reto
        },
        id:'aceptar-reto'
      });
  
       await modal.present();
  
      let {data} = await modal.onDidDismiss();
      this.reservacionesService.syncgGtReservacionesRecibidas(this.usuariosSErvice.usuarioActual.usuario.Cod_Usuario).then(reservaciones=>{
        this.reservaciones = reservaciones;
            })
    }
}
