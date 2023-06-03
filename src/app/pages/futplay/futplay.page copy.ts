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
      
      this.reservacionesService.syncgGtReservacionesRecibidas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones => {
        this.reservacionesService.reservaciones = reservaciones;
        this.router.navigate(['/futplay/mi-perfil']);

      })

    }

  }

  reservaciones(){
    this.router.navigate(['/futplay/mis-reservaciones']);
  }
  misEquipos() {
    this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp => {


      if (resp.length == 0) {
        this.crearEquipo();

      } else {

        this.equiposService.misEquipos = resp.slice(0);
        this.equiposService.equipo = resp[0];

        this.router.navigate(['/futplay/perfil-equipo']);
  

    
   


      }


    }, error => {

      this.alertasService.message('FUTLAY', 'Error cargando datos...');

    })




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

  equipos() {
    this.equiposService.equipos = [];
    this.equiposService.syncListaEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp => {

      this.equiposService.equipos = resp.slice(0);

      this.router.navigate(['/futplay/rivales']);
    }, error => {

      this.alertasService.message('FUTLAY', 'Error cargando datos...');
    })



  }
  canchas() {

  //  this.alertasService.presentaLoading('cargando canchas...')
    this.canchasService.canchas = [];
      this.canchasService.syncListaCanchasToPromise().then(canchas => {
//this.alertasService.loadingDissmiss();
        this.canchasService.canchas = canchas;
        console.log('this.canchasService.canchas', this.canchasService.canchas)
        this.router.navigate(['/futplay/canchas']);
      }, error => {

        this.alertasService.message('FUTLAY', 'Error cargando datos...');
      })






  }




}