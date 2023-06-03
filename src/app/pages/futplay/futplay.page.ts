import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CrearUnirseEquipoPage } from '../crear-unirse-equipo/crear-unirse-equipo.page';
import { ReservacionesService } from '../../services/reservaciones.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-futplay',
  templateUrl: './futplay.page.html',
  styleUrls: ['./futplay.page.scss'],
})
export class FutplayPage implements OnInit {
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService: UsuariosService,
    public canchasService: CanchasService,
    public router: Router,
    public alertasService: AlertasService,
    public jugadoresService: JugadoresService,
    public reservacionesService: ReservacionesService,
    public solicitudesService: SolicitudesService



  ) { }

  ngOnInit() {

  }

  
  profile() {
    if (this.usuariosService.usuarioActual) { 
      this.router.navigate(['/futplay/mi-perfil']);
    }
  }
  async reservaciones(){
    this.router.navigate(['/futplay/mis-reservaciones']);
  }
 
async   misEquipos(){
   let equipos = await this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario);
   this.equiposService.equipo = equipos[0]
    this.router.navigate(['/futplay/perfil-equipo']);

  }
  anuncios(){
    this.router.navigate(['/futplay/anuncios']);
  }
 
  configuraciones(){
    this.router.navigate(['/futplay/configuraciones']);
  }






  async crearEquipo() {
    const modal = await this.modalCtrl.create({
      component: CrearUnirseEquipoPage,
      cssClass: 'my-custom-modal',
      id: 'create-join-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data !== undefined) {
      modal.dismiss();
      console.log(data, 'data')


    }

  }




}