import { Component, OnInit } from '@angular/core';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historial-retos',
  templateUrl: './historial-retos.page.html',
  styleUrls: ['./historial-retos.page.scss'],
})
export class HistorialRetosPage implements OnInit {
  textoBuscar = '';
  reservaciones:PerfilReservaciones[]=[];
  url = environment.archivosURL;
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService,
public modalCtrl:ModalController


  ) { }

  ngOnInit() {
    this.reservacionesHistorial();
 
  }
  reservacionesHistorial(){
    this.reservacionesService.syncgGtReservacionesHistorial(this.usuariosSErvice.usuarioActual.Cod_Usuario).then(reservaciones=>{
      this.reservaciones = reservaciones;
          })
  }
  async detalleReto(reto:PerfilReservaciones) {

  
    const modal = await this.modalCtrl.create({
      component: AceptarRetoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto
      },
    });

     await modal.present();

    let {data} = await modal.onDidDismiss();
    this.reservacionesHistorial();
  }
  onSearchChange($event){
    this.textoBuscar = $event.detail.value;
  }
  regresar(){
    this.modalCtrl.dismiss();
  }
}