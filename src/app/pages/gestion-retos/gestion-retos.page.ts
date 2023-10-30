import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { AlertasService } from 'src/app/services/alertas.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';

@Component({
  selector: 'app-gestion-retos',
  templateUrl: './gestion-retos.page.html',
  styleUrls: ['./gestion-retos.page.scss'],
})
export class GestionRetosPage implements OnInit {
  reservaciones: PerfilReservaciones[] = [];
  url = environment.archivosURL;
  textoBuscar = '';
  constructor(
    public router: Router, 
    public reservacionesService:ReservacionesService, 
    public usuariosService:UsuariosService, 
    public alertasService:AlertasService,
    public modalCtrl:ModalController
    
    ) {}

 async  ngOnInit() {
    this.reservaciones = await this.reservacionesService.syncgGtReservacionesHistorial(this.usuariosService.usuarioActual.Cod_Usuario);
  }

  regresar() {
    this.router.navigateByUrl('/futplay/reservaciones', { replaceUrl: true });
  }
  redirigir(ruta) {
    this.router.navigateByUrl(ruta, { replaceUrl: true });
  }
  ListaCanchas() {
    this.router.navigateByUrl('futplay/canchas', { replaceUrl: true });
  }
  onSearchChange($event){
    this.textoBuscar = $event.detail.value;
  }
  filtroUbicacion(){
    this.alertasService.message('FUTPLAY', 'Not Availabe yet')
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
     
  
}


}
