import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { EvaluacionEquipoPage } from '../evaluacion-equipo/evaluacion-equipo.page';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PartidoService } from 'src/app/services/partido.service';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { PerfilJugador } from '../../models/perfilJugador';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evaluacion-jugador',
  templateUrl: './evaluacion-jugador.page.html',
  styleUrls: ['./evaluacion-jugador.page.scss'],
})
export class EvaluacionJugadorPage implements OnInit {
  @Input() equipo: any;
  @Input() partido: any;
  @Input() reto: PerfilReservaciones;
  jugadoresRetadores: PerfilJugador[];
  jugadoresRivales: PerfilJugador[];
  next = false;
  evaluacionJugador: any = {
    Cod_Historial_Jugador: null,
    Cod_Partido: 0,
    Jugador_Futplay: 0,
    Jugador_Del_Partido: 0,
  };
  stadiumProfile = 'assets/main/player-profile.svg';
  slideOpts = {
    allowTouchMove: false,
  };
  titulo = 'PLAYER_OF_THE_MATCH';
  url  = environment.archivosURL;
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public historialPartido: PartidoService,
    public usuariosSerice: UsuariosService,
    public jugadoresService: JugadoresService
  ) {}

  ngOnInit() {
    this.jugadoresService
      .syncJugadoresEquipos(
        this.equipo.Cod_Equipo == this.reto.retador.Cod_Equipo
          ? this.reto.rival.Cod_Equipo
          : this.reto.retador.Cod_Equipo
      )
      .then((jugadores) => {
        this.jugadoresRetadores = jugadores;
        this.jugadoresService
          .syncJugadoresEquipos(
            this.equipo.Cod_Equipo == this.reto.retador.Cod_Equipo
              ? this.reto.rival.Cod_Equipo
              : this.reto.retador.Cod_Equipo
          )
          .then((jugadores) => {
            this.jugadoresRivales = jugadores;
          });
      });
    this.evaluacionJugador.Cod_Partido = this.partido.Cod_Partido;
  }

  async continuar() {
    const modal = await this.modalCtrl.create({
      component: EvaluacionEquipoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        equipo:
          this.equipo.Cod_Equipo == this.reto.retador.Cod_Equipo
            ? this.reto.rival
            : this.reto.retador,
        partido: this.partido,
        reto: this.reto,
      },
      id: 'evaluacion-equipo',
    });

    await modal.present();
    let { data } = await modal.onDidDismiss();

    this.regresar();
  }

  regresar() {
    this.modalCtrl.dismiss(null, null, 'evaluacion-individual');
  }

  agregarJFP(value) {
    this.evaluacionJugador.Jugador_Futplay =
      value.detail.value.jugador.Cod_Usuario;
    this.evaluacionJugador.Cod_Partido = this.partido.Cod_Partido;
    this.usuariosSerice
      .syncJugadorFutplay(this.evaluacionJugador.Jugador_Futplay)
      .then((resp) => {
        this.usuariosSerice
          .syncJugadorDelPartido(this.evaluacionJugador.Jugador_Del_Partido)
          .then((resp) => {
            this.continuar();
          });
      });
  }

  agregarJDP(value) {
    this.titulo = 'FUTPLAY_PLAYER';
    this.evaluacionJugador.Jugador_Del_Partido =
      value.detail.value.jugador.Cod_Usuario;
    this.next = true;
  }
}
