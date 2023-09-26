import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonicSlides, ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { Equipos } from '../../models/equipos';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GestorEquipoImagenesService } from 'src/app/services/gestor-equipo-imagenes.service';
import { TranslateService } from '@ngx-translate/core';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { format } from 'date-fns';
declare const window: any;
@Component({
  selector: 'app-editar-perfil-equipo',
  templateUrl: './editar-perfil-equipo.page.html',
  styleUrls: ['./editar-perfil-equipo.page.scss'],
})
export class EditarPerfilEquipoPage implements OnInit {
  url = environment.archivosURL;
  img = 'assets/main/team-profile.svg';
  imageURL = null;
  image = '';
  @ViewChild(IonicSlides) slides;
  @Input() equipo: Equipos;
  @ViewChild('fRegistroEquipo') fRegistroEquipo: NgForm;
  modalOpen: boolean = false;
  avatarSlide = null;
  avatars = false;
  imgs = [
    { seleccionado: false, img: '001-barcelona.svg' },
    { seleccionado: false, img: '002-chelsea.svg' },
    { seleccionado: false, img: '003-borussia-monchengladach.svg' },
    { seleccionado: false, img: '004-borussia-dortmund.svg' },
    { seleccionado: false, img: '005-bayern-leverkusen.svg' },
    { seleccionado: false, img: '006-atletico-de-madrid.svg' },
    { seleccionado: false, img: '007-villarreal.svg' },
    { seleccionado: false, img: '008-roman.svg' },
    { seleccionado: false, img: '009-valencia.svg' },
    { seleccionado: false, img: '010-sampdoria.svg' },
    { seleccionado: false, img: '011-tottenham-hotspur.svg' },
    { seleccionado: false, img: '012-lazio.svg' },
    { seleccionado: false, img: '013-napoli.svg' },
    { seleccionado: false, img: '014-sevilla.svg' },
    { seleccionado: false, img: '015-real-madrid.svg' },
    { seleccionado: false, img: '016-leipzig.svg' },
    { seleccionado: false, img: '017-paris-saint-germain.svg' },
    { seleccionado: false, img: '018-olympique-lyonnais.svg' },
    { seleccionado: false, img: '019-monaco.svg' },
    { seleccionado: false, img: '020-olympique-de-marseille.svg' },
    { seleccionado: false, img: '021-nice.svg' },
    { seleccionado: false, img: '022-manchester-united.svg' },
    { seleccionado: false, img: '023-manchester-city.svg' },
    { seleccionado: false, img: '024-liverpool.svg' },
    { seleccionado: false, img: '025-juventus.svg' },
    { seleccionado: false, img: '026-internazionale-milano.svg' },
    { seleccionado: false, img: '027-schalke-04.svg' },
    { seleccionado: false, img: '028-nantes.svg' },
    { seleccionado: false, img: '029-bayern-munchen.svg' },
    { seleccionado: false, img: '030-arsenal.svg' },
  ];

  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService,
    public equiposService: EquiposService,
    public alertasService: AlertasService,
    public router: Router,
    public alertCtrl: AlertController,
    public cd: ChangeDetectorRef,
    public gestorEquiposImagenesService: GestorEquipoImagenesService,
    private translateService: TranslateService,
    public reservacionesService: ReservacionesService
  ) {}

  async ngOnInit() {
    const i = this.imgs.findIndex((image) => image.img == this.equipo.Foto);
    if (i >= 0) {
      let selectedImage = this.imgs[i];
      selectedImage.seleccionado = true;
      this.imgs.splice(i, 1);
      this.imgs.unshift(selectedImage);
      if (!this.equipo.Avatar) {
        this.equipo.Avatar = true;
      }
    }
  }
  adjuntarImagen() {
    this.gestorEquiposImagenesService.post = true;
    this.gestorEquiposImagenesService.alertaCamara();
  }


  avatar() {
    this.avatars = !this.avatars;
  }

  dateF() {
    return new Date().getTime();
  }

  seleccionarAvatar(img, i) {
    this.imgs.forEach((av) => (av.seleccionado = false));
    img.seleccionado = true;
    this.image = this.imgs[i].img;
   
 
  }

  slideChange(event) {
    this.slides.getActiveIndex().then((resp) => {
      this.imgs.forEach((av) => (av.seleccionado = false));
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img;
       
    });
  }

  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  updateTeam(fRegistroEquipo: NgForm) {
    let form = fRegistroEquipo.value;
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
    this.alertasService.presentaLoading(this.translateService.instant('UPDATING_DATA'))
    if (this.image){
      this.equipo.Foto = this.image;
      this.equipo.Avatar = true;
    
    }
    this.equipo.Nombre = form.Nombre;
    this.equipo.Abreviacion = form.Abreviacion;
    this.equiposService
      .putEquipoToPromise(
        this.equipo,
        this.usuariosService.usuarioActual.Cod_Usuario
      )
      .then((resp: any) => {
        if (resp.action) {
          this.equiposService
            .syncMisEquiposToPromise(
              this.usuariosService.usuarioActual.Cod_Usuario
            )
            .then((equipos) => {
              this.equiposService.equipos = equipos;

              let i = this.equiposService.equipos.findIndex(
                (equipo) => equipo.equipo.Cod_Equipo == resp.equipo.Cod_Equipo
              );
              if (i >= 0) {
                this.equiposService.equipo = this.equiposService.equipos[i];
              } else {
                this.equiposService.equipo = this.equiposService.equipos[0];
              }
              this.alertasService.loadingDissmiss();
              this.alertasService.message(
                'FUTPLAY',
                this.translateService.instant('ACTION_COMPLETED')
              );
            });
        } else {
          this.alertasService.loadingDissmiss();
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('SOMETHING_WENT_WRONG')
          );
        }
      });
  }

  eliminarEquipo() {
    this.equiposService.syncDeleteEquipo(this.equipo.Cod_Equipo).then(
      (resp) => {
        this.equiposService
          .syncMisEquiposToPromise(
            this.usuariosService.usuarioActual.Cod_Usuario
          )
          .then((equipos) => {
            this.equiposService.misEquipos = equipos;

            this.equiposService.equipo = this.equiposService.misEquipos[0];
            this.regresar();
          });
      },
      (error) => {
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('SOMETHING_WENT_WRONG')
        );
      }
    );
  }
  async alertaEliminar() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      message: this.translateService.instant(
        'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_TEAM'
      ),
      cssClass: 'custom-alert',
      buttons: [
        {
          text: this.translateService.instant('CANCEL'),
          role: 'cancel',
          handler: () => {},
        },
        {
          text: this.translateService.instant('CONTINUE'),
          role: 'Continuar',
          handler: () => {
            this.eliminarEquipos();
          },
        },
      ],
    });

    await alert.present();
  }
  eliminarEquipos() {
    this.reservacionesService
      .syncGetReservcionesFuturas(
        this.equiposService.equipo.equipo.Cod_Equipo,
        format(new Date(), 'yyy-MM-dd')
      )
      .then((resp) => {
        if (resp.length > 0) {
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant(
              'YOU_CANNOT_DELETE_A_TEAM_WITH_RESERVATIONS'
            )
          );
        } else {
          this.equiposService
            .syncDeleteEquipo(this.equiposService.equipo.equipo.Cod_Equipo)
            .then(
              (resp) => {
                this.equiposService
                  .syncMisEquiposToPromise(
                    this.usuariosService.usuarioActual.Cod_Usuario
                  )
                  .then((resp) => {
                    this.equiposService.misEquipos = resp;
                    this.equiposService.equipo = resp[0];
                    this.alertasService.message(
                      'FUTPLAY',
                      this.translateService.instant('ACTION_COMPLETED')
                    );
                    this.modalCtrl.dismiss(true);
                  });
              },
              (error) => {
                this.alertasService.message(
                  'FUTPLAY',
                  this.translateService.instant('SOMETHING_WENT_WRONG')
                );
              }
            );
        }
      });
  }
}
