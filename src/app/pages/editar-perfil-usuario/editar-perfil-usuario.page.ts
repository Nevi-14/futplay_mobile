import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonicSlides, ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { PosicionesService } from 'src/app/services/posiciones.service';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';
import avatarArray from '../../../assets/data/avatars.json';
import { AlertasService } from 'src/app/services/alertas.service';
import { ChangeDetectorRef } from '@angular/core';
import { GestorImagenesService } from '../../services/gestor-imagenes.service';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { EquiposService } from 'src/app/services/equipos.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-perfil-usuario',
  templateUrl: './editar-perfil-usuario.page.html',
  styleUrls: ['./editar-perfil-usuario.page.scss'],
})
export class EditarPerfilUsuarioPage implements OnInit {
  @ViewChild(IonicSlides) slides: any;

  Cod_Canton: any;
  showPosicion = false;
  showProvicia = false;
  showCanton = false;
  showDistrito = false;
  dataProvincias = [];
  dataCantones = [];
  dataDistritos = [];
  dataPosiciones = [];
  imgs = avatarArray;
  url = environment.archivosURL;
  private modalOpen = false;
  areaUnit = 1;
  sliderOpts = {
    zoom: false,
    slidesPerView: 4,
    spaceBetween: 2,
    centeredSlides: false,
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      940: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  };
  usuario = this.usuarioService.usuarioActual;
  isVisible = false;
  image = 'assets/user.svg';
  languages = [
    { id: 'Es', valor: this.translateService.instant('SPANISH') },
    { id: 'US', valor: this.translateService.instant('ENGLISH') },
    { id: 'PO', valor: this.translateService.instant('PORTUGUESE') },
  ];
  avatarSlide = {
    slidesPerView: 2.5,
  };
  avatars = false;
  imgs2 = [
    { seleccionado: false, img: '049-boy.svg' },
    { seleccionado: false, img: '002-girl-26.svg' },
    { seleccionado: false, img: '003-boy-14.svg' },
    { seleccionado: false, img: '004-woman-1.svg' },
    { seleccionado: false, img: '005-man-3.svg' },
    { seleccionado: false, img: '006-woman.svg' },
    { seleccionado: false, img: '007-girl-25.svg' },
    { seleccionado: false, img: '008-girl-24.svg' },
    { seleccionado: false, img: '009-boy-13.svg' },
    { seleccionado: false, img: '010-girl-23.svg' },
    { seleccionado: false, img: '011-boy-12.svg' },
    { seleccionado: false, img: '012-girl-22.svg' },
    { seleccionado: false, img: '013-boy-11.svg' },
    { seleccionado: false, img: '014-boy-10.svg' },
    { seleccionado: false, img: '015-girl-21.svg' },
    { seleccionado: false, img: '016-girl-20.svg' },
    { seleccionado: false, img: '017-boy-9.svg' },
    { seleccionado: false, img: '018-boy-8.svg' },
    { seleccionado: false, img: '019-girl-19.svg' },
    { seleccionado: false, img: '020-boy-7.svg' },
    { seleccionado: false, img: '021-boy-6.svg' },
    { seleccionado: false, img: '022-boy-5.svg' },
    { seleccionado: false, img: '023-girl-18.svg' },
    { seleccionado: false, img: '024-boy-4.svg' },
    { seleccionado: false, img: '025-girl-17.svg' },
    { seleccionado: false, img: '026-girl-16.svg' },
    { seleccionado: false, img: '027-hipster.svg' },
    { seleccionado: false, img: '028-girl-15.svg' },
    { seleccionado: false, img: '029-girl-14.svg' },
    { seleccionado: false, img: '030-girl-13.svg' },
    { seleccionado: false, img: '031-boy-3.svg' },
    { seleccionado: false, img: '032-girl-12.svg' },
    { seleccionado: false, img: '033-man-2.svg' },
    { seleccionado: false, img: '034-girl-11.svg' },
    { seleccionado: false, img: '035-girl-10.svg' },
    { seleccionado: false, img: '036-girl-9.svg' },
    { seleccionado: false, img: '037-girl-8.svg' },
    { seleccionado: false, img: '038-man-1.svg' },
    { seleccionado: false, img: '039-girl-7.svg' },
    { seleccionado: false, img: '040-man.svg' },
    { seleccionado: false, img: '041-girl-6.svg' },
    { seleccionado: false, img: '042-girl-5.svg' },
    { seleccionado: false, img: '043-girl-4.svg' },
    { seleccionado: false, img: '044-boy-2.svg' },
    { seleccionado: false, img: '045-girl-3.svg' },
    { seleccionado: false, img: '046-girl-2.svg' },
    { seleccionado: false, img: '047-boy-1.svg' },
    { seleccionado: false, img: '048-girl-1.svg' },
    { seleccionado: false, img: '001-boy-15.svg' },
    { seleccionado: false, img: '050-girl.svg' },
  ];

  constructor(
    public modalCtrl: ModalController,
    public posicionesService: PosicionesService,
    public usuarioService: UsuariosService,
    public alertasService: AlertasService,
    public cdr: ChangeDetectorRef,
    public gestorImagenesService: GestorImagenesService,
    private translateService: TranslateService,
    public equiposService: EquiposService,
    public reservacionesService: ReservacionesService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {console.log(this.usuario);
    this.posicionesService.posiciones = [];
    this.posicionesService.syncPosicionesToPromise().then((resp) => {
      this.showPosicion = true;
      this.usuario.Cod_Posicion =
        this.usuarioService.usuarioActual.Cod_Posicion;
      this.posicionesService.posiciones = resp;
      resp.forEach((posision) => {
        let data = {
          id: posision.Cod_Posicion,
          valor: posision.Posicion,
        };
        this.dataPosiciones.push(data);
      });
    });
  }

  adjuntarImagen() {
    this.gestorImagenesService.post = true;
    this.gestorImagenesService.alertaCamara();
  }

  avatar() {
    this.avatars = !this.avatars;
  }

  slideChange(event) {
    this.slides.getActiveIndex().then((resp) => {
      this.imgs.forEach((av) => (av.seleccionado = false));
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img;
      this.usuario.Foto = this.imgs[resp].img;
      this.usuario.Avatar = true;
      this.usuarioService.usuarioActual.Avatar = true;
      this.usuarioService.usuarioActual.Foto = this.imgs[resp].img;
    });
  }

  updateUser(fRegistroEquipo: NgForm) {
    let usuario = fRegistroEquipo.value;
    console.log(usuario);
    this.usuario.Nombre = usuario.Nombre;
    this.usuario.Primer_Apellido = usuario.Primer_Apellido;
    this.usuario.Apodo = usuario.Apodo;
    this.usuario.Cod_Posicion = usuario.Cod_Posicion;
    this.usuario.Estatura = usuario.Estatura;
    this.usuario.Peso = usuario.Peso;
    this.usuario.Codigo_Llamadas = usuario.Codigo_Llamadas;
    this.usuario.Telefono = usuario.Telefono;
    this.usuario.Correo = usuario.Correo;
    this.usuario.Idioma = usuario.Idioma;

    this.usuarioService.usuarioActual = this.usuario;
    this.modalCtrl.dismiss({ data: true }, null, 'perfil-usuario');
    this.usuarioService.actualizarUsuario(
      this.usuario,
      this.usuario.Cod_Usuario
    );
  }

  seleccionarAvatar(img, i) {
    this.imgs.forEach((av) => (av.seleccionado = false));
    img.seleccionado = true;
    this.image = this.imgs[i].img;
    this.usuario.Foto = this.imgs[i].img;
    this.usuario.Avatar = true;
    this.usuarioService.usuarioActual.Avatar = true;
    this.usuarioService.usuarioActual.Foto = this.image;
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async SelectDate() {
    if (!this.modalOpen) {
      this.modalOpen = true;
      const modal = await this.modalCtrl.create({
        component: SeleccionarFechaPage,
        cssClass: 'date-modal',
        breakpoints: [0, 0.3, 0.5, 0.8],
        initialBreakpoint: 0.5,
        componentProps: {
          title: 'Fecha de nacimiento',
          id: 'seleccionar-fecha',
          fecha: new Date(
            this.usuarioService.usuarioActual.Fecha_Nacimiento.replace('-', '/')
          ),
        },
        id: 'seleccionar-fecha',
      });

      await modal.present();
      const { data } = await modal.onWillDismiss();

      if (data !== undefined) {
        this.usuario.Fecha_Nacimiento = format(data.date, 'yyyy/MM/dd');
        this.modalOpen = false;
      } else {
        this.modalOpen = false;
      }
    }
  }
  async alertaEliminar() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      message: this.translateService.instant(
        'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_ACCOUNT'
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
            this.eliminarCuenta();
          },
        },
      ],
    });

    await alert.present();
  }
  eliminarCuenta() {
    this.equiposService
      .syncMisEquiposToPromise(this.usuarioService.usuarioActual.Cod_Usuario)
      .then((equipos) => {
        let continuar = true;

        if (equipos.length == 0) {
          return this.usuarioService
            .syncDeleteUserToPromise(
              this.usuarioService.usuarioActual.Cod_Usuario
            )
            .then((resp) => {
              this.alertasService.message(
                'FUTPLAY',
                this.translateService.instant('ACCOUNT_DELETED_SUCCESSFULLY')
              );
              this.modalCtrl.dismiss(true);
              this.usuarioService.cerrarSession();
            });
        }
        for (let i = 0; i < equipos.length; i++) {
          this.reservacionesService
            .syncGetReservcionesFuturas(
              equipos[i].equipo.Cod_Equipo,
              format(new Date(), 'yyy-MM-dd')
            )
            .then((reservaciones) => {
              if (
                reservaciones.length > 0 &&
                equipos[i].equipo.Cod_Usuario ==
                  this.usuarioService.usuarioActual.Cod_Usuario
              ) {
                continuar = false;
              }
            });

          if (i == equipos.length - 1) {
            if (continuar) {
              this.usuarioService
                .syncDeleteUserToPromise(
                  this.usuarioService.usuarioActual.Cod_Usuario
                )
                .then((resp) => {
                  this.alertasService.message(
                    'FUTPLAY',
                    this.translateService.instant(
                      'ACCOUNT_DELETED_SUCCESSFULLY'
                    )
                  );
                  this.modalCtrl.dismiss(true);
                  this.usuarioService.cerrarSession();
                });
            } else {
              this.alertasService.message(
                'FUTPLAY',
                this.translateService.instant(
                  'YOU_CANNOT_DELETE_YOUR_ACCOUNT_BECAUSE_YOU_HAVE_FUTURE_RESERVATIONS'
                )
              );
            }
          }
        }
      });
  }
}
