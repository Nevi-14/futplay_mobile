import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipos } from '../../models/equipos';
import imgs from '../../../assets/data/equipos.avatars.json';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Jugador } from '../../models/jugador';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { IonicSlides, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GestorEquipoImagenesService } from 'src/app/services/gestor-equipo-imagenes.service';
import { NgForm } from '@angular/forms';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { EquipoGeolocalizacion } from 'src/app/models/equipoGeolocalizacion';
import { EquiposGeolocalizacionService } from 'src/app/services/equipos-geolocalizacion.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.page.html',
  styleUrls: ['./crear-equipo.page.scss'],
})
export class CrearEquipoPage implements OnInit {
  imgs = imgs;
  equipo: Equipos = {
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Foto: 'No Pic',
    Dureza: 0,
    Avatar: true,
    Nombre: null,
    Estrellas: 1,
    Abreviacion: null,
    Cod_Equipo: null,
    Estrellas_Anteriores: null,
    Posicion_Actual: null,
    Puntaje_Actual: null,
    Partidos_Ganados: null,
    Partidos_Perdidos: null,
    Goles_Favor: null,
    Goles_Encontra: null,
    Promedio_Altura_Jugadores: null,
    Promedio_Peso_Jugadores: null,
    Estado: true,
    Descripcion_Estado: null,
  };

  geolocalizacion: EquipoGeolocalizacion = {
    ID: null,
    Cod_Equipo: null,
    Codigo_Pais: null,
    Pais: null,
    Codigo_Estado: null,
    Estado: null,
    Codigo_Ciudad: null,
    Ciudad: null,
    Codigo_Postal: null,
    Direccion: null,
  };
  jugador: Jugador = {
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Cod_Equipo: null,
    Favorito: false,
    Administrador: true,
  };

  modalOpen: boolean = false;
  avatarSlide = null;
  image = '';
  avatars = false;
  @ViewChild(IonicSlides) slides;
  constructor(
    public alertasService: AlertasService,
    public modalCtrl: ModalController,
    public router: Router,
    public equiposService: EquiposService,
    public usuariosService: UsuariosService,
    public jugadoresService: JugadoresService,
    public gestorEquiposImagenesService: GestorEquipoImagenesService,
    public geolocalizacionService: GeolocalizacionService,
    public equiposGeolocalizacionService: EquiposGeolocalizacionService,
    private translateService: TranslateService
  ) {}

  async ngOnInit() {
    this.geolocalizacionService.Codigo_Pais = null;
    this.geolocalizacionService.Codigo_Estado = null;
    this.geolocalizacionService.Codigo_Ciudad = null;
    this.geolocalizacionService.Codigo_Postal = null;
    this.geolocalizacionService.paises = [];
    this.geolocalizacionService.estados = [];
    this.geolocalizacionService.ciudades = [];
    this.equipo.Foto = this.imgs[0].img;
    this.geolocalizacionService.loadCountries();
    this.gestorEquiposImagenesService.images = [];
  }
  slideChange(event) {
    this.slides.getActiveIndex().then((resp) => {
      this.imgs.forEach((av) => (av.seleccionado = false));
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img;
       
    });
  }
  adjuntarImagen() {
    this.equipo.Avatar = false;
    this.equipo.Foto = 'No Pic';
    this.gestorEquiposImagenesService.alertaCamara();
  }
  crearRegistro(fRegistro: NgForm) {
    let form = fRegistro.value;
    if (!form.Nombre) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('YOU_MUST_TYPE_A_NAME')
      );
      return;
    }
    if (!form.Abreviacion) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('YOU_MUST_TYPE_ABBREVIATION')
      );
      return;
    }
    if (form.Abreviacion.length > 3) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant(
          'ABBREVIATION_MUST_BE_LESS_THAN_3_CHARACTERS'
        )
      );
      return;
    }

    if (!form.Codigo_Pais) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('YOU_MUST_SELECT_A_COUNTRY')
      );
      return;
    }

    this.equipo.Nombre = form.Nombre;
    this.equipo.Abreviacion = form.Abreviacion;

    if (this.gestorEquiposImagenesService.images.length == 0) {
      this.equipo.Avatar = true;
      this.equipo.Foto = this.imgs[0].img;
    }
    this.alertasService.presentaLoading(
      this.translateService.instant('CREATING_TEAM')
    );
    this.equiposService.syncPostEquipoToPromise(this.equipo).then(
      (resp: Equipos) => {
        let equipo = resp;
        this.geolocalizacion.Cod_Equipo = equipo.Cod_Equipo;
        this.geolocalizacion.Cod_Equipo = equipo.Cod_Equipo;
        this.geolocalizacion.Codigo_Pais = form.Codigo_Pais;
        this.geolocalizacion.Codigo_Estado = form.Codigo_Estado;
        this.geolocalizacion.Codigo_Ciudad = form.Codigo_Ciudad;
        this.geolocalizacion.Codigo_Postal = form.Codigo_Postal;
        let indexPais = this.geolocalizacionService.paises.findIndex(
          (e) => e.id == this.geolocalizacionService.Codigo_Pais
        );
        let indexEstado = this.geolocalizacionService.estados.findIndex(
          (e) => e.id == this.geolocalizacionService.Codigo_Estado
        );
        let indexCiudad = this.geolocalizacionService.ciudades.findIndex(
          (e) => e.id == this.geolocalizacionService.Codigo_Ciudad
        );

        if (indexPais >= 0) {
          this.geolocalizacion.Pais =
            this.geolocalizacionService.paises[indexPais].valor;
        }

        if (indexEstado >= 0) {
          this.geolocalizacion.Estado =
            this.geolocalizacionService.paises[indexEstado].valor;
        }

        if (indexCiudad >= 0) {
          this.geolocalizacion.Ciudad =
            this.geolocalizacionService.ciudades[indexCiudad].valor;
        }

        this.equiposGeolocalizacionService
          .syncPostEquipoGeolocalizacionToPromise(this.geolocalizacion)
          .then((resp) => {
            this.alertasService.loadingDissmiss();

            this.jugador.Cod_Equipo = equipo.Cod_Equipo;
            this.jugadoresService
              .syncPostJugadorEquipoToPromise(this.jugador)
              .then(
                (resp) => {
                  this.equiposService
                    .syncMisEquiposToPromise(
                      this.usuariosService.usuarioActual.Cod_Usuario
                    )
                    .then(
                      (equipos) => {
                        if (equipos.length > 0) {
                          this.equiposService.equipo =
                            equipos[equipos.length - 1];

                          this.equiposService.misEquipos = equipos;
                          this.jugadoresService
                            .syncJugadoresEquipos(
                              this.equiposService.equipo.equipo.Cod_Equipo
                            )
                            .then((resp) => {
                              this.jugadoresService.jugadores = resp;

                              if (
                                this.gestorEquiposImagenesService.images
                                  .length > 0
                              ) {
                                this.gestorEquiposImagenesService.startUpload();
                              } else {
                                this.alertasService.message(
                                  'FUTLAY',
                                  this.translateService.instant(
                                    'TEAM_CREATED_SUCCESSFULLY'
                                  )
                                );
                                this.gestorEquiposImagenesService.reset();
                              }
                            });
                        }

                        this.modalCtrl.dismiss(
                          {
                            equipo: this.equipo,
                          },
                          null,
                          'create-modal'
                        );

                        this.router.navigate(['/futplay/perfil-equipo']);
                      },
                      (error) => {}
                    );
                },
                (error) => {}
              );
          });
      },
      (error) => {
        this.alertasService.loadingDissmiss();
        this.alertasService.message(
          'FUTLAY',
          this.translateService.instant('SOMETHING_WENT_WRONG')
        );
      }
    );
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  seleccionarAvatar(img, i) {
    this.gestorEquiposImagenesService.images = [];
    this.imgs.forEach((av) => (av.seleccionado = false));
    img.seleccionado = true;
    this.image = this.imgs[i].img;
    this.equipo.Foto = this.imgs[i].img;
    this.equipo.Avatar = true;
  }
}
