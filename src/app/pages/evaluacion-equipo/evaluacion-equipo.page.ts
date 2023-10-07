import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { AlertasService } from '../../services/alertas.service';
import { Equipos } from '../../models/equipos';
import { partidos } from 'src/app/models/partidos';
import { PartidoService } from '../../services/partido.service';
import { HistorialPartidoEquipos } from '../../models/historialPartidoEquipo';
import { StorageService } from '../../services/storage-service';
import { UsuariosService } from '../../services/usuarios.service';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
 
@Component({
  selector: 'app-evaluacion-equipo',
  templateUrl: './evaluacion-equipo.page.html',
  styleUrls: ['./evaluacion-equipo.page.scss'],
})
export class EvaluacionEquipoPage implements OnInit {
  url = environment.archivosURL;
  stadiumProfile = 'assets/main/team-profile.svg';
  dureza = [
    {
      id: 0,
      titulo: this.translateService.instant('NEUTRAL_TEAM'),
      image: 'equipo-neutral.svg',
    },
    {
      id: 1,
      titulo: this.translateService.instant('ANNOYING_GAME'),
      image: 'juego-molesto.svg',
    },
    {
      id: 2,
      titulo: this.translateService.instant('IRRESPONSIBLE_AGGRESSIVENESS'),
      image: 'agresividad-irresponsable.svg',
    },
    {
      id: 3,
      titulo: this.translateService.instant('REBELLIOUS_CHARACTER'),
      image: 'caracter-revelde.svg',
    },
    {
      id: 4,
      titulo: this.translateService.instant('MORE_THAN_A_CLUB'),
      image: 'mas-que-un-club.svg',
    },
    {
      id: 5,
      titulo: this.translateService.instant('WORLD_CLASS_FAIR_PLAY'),
      image: 'clase-mundial-fairplay.svg',
    },
  ];
  indexD = 0;
  @Input() equipo: Equipos;
  @Input() partido: partidos;
  @Input() reto: PerfilReservaciones;
  evaluacionEquipo: HistorialPartidoEquipos = {
    Cod_Historial: null,
    Cod_Equipo: null,
    Dureza: null
  };

  constructor(
    public historialPartidosService: PartidoService,
    public modalCtrl: ModalController,
    public equiposservice: EquiposService,
    public alertasService: AlertasService,
    public storageService: StorageService,
    public usuariosService: UsuariosService,
    public reservacionesService: ReservacionesService,
    public translateService: TranslateService
  ) {}

  ngOnInit() {}

  durezaEquipo(value) {
    this.indexD = value.detail.value;
    this.evaluacionEquipo.Cod_Equipo = this.equipo.Cod_Equipo;
    this.evaluacionEquipo.Dureza = value.detail.value;
    this.finalizar();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  finalizar() {
    this.equiposservice.syncPostDurezaEquipo(this.evaluacionEquipo).then(resp => {
      let stringID = this.reto.reservacion.Cod_Reservacion + "-" + this.usuariosService.usuarioActual.Cod_Usuario + "-" + this.reto.reservacion.Fecha;
      this.reservacionesService.cargarReservaciones();
      this.modalCtrl.dismiss();
    });
  }
}