import { Component, OnInit } from '@angular/core';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-retos',
  templateUrl: './historial-retos.page.html',
  styleUrls: ['./historial-retos.page.scss'],
})
export class HistorialRetosPage implements OnInit {
url = environment.archivosURL;
  reservaciones:PerfilReservaciones[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService,
public modalCtrl:ModalController,
public router:Router


  ) { }

  ngOnInit() {
    this.reservacionesHistorial();
 
  }
  regresar(){
    this.router.navigateByUrl('/futplay/reservaciones', {replaceUrl:true})
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
}
