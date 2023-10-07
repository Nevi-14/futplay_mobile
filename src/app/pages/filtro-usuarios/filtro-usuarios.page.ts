import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { PosicionesService } from 'src/app/services/posiciones.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.page.html',
  styleUrls: ['./filtro-usuarios.page.scss'],
})
export class FiltroUsuariosPage implements OnInit {
  filtro = {
    Codigo_Pais: null,
    Codigo_Estado: null,
    Codigo_Ciudad: null,
    Codigo_Posicion: null,
  };
  @Input() Cod_Provincia: number;
  @Input() Cod_Canton: number;
  @Input() Cod_Distrito: number;
  @Input() Cod_Posicion: number;
  posiciones = [];

  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService: UsuariosService,
    public geolocalizacionService: GeolocalizacionService,
    public posicionesService: PosicionesService
  ) {}

  ngOnInit() {
    this.geolocalizacionService.loadCountries();

    this.posicionesService.syncPosicionesToPromise().then((posiciones) => {
      posiciones.forEach((posicion) => {
        let posi = {
          id: posicion.Cod_Posicion,
          valor: posicion.Posicion,
        };
        this.posiciones.push(posi);
      });
    });
  }

  limpiarDatos() {
    this.filtro = {
      Codigo_Pais: null,
      Codigo_Estado: null,
      Codigo_Ciudad: null,
      Codigo_Posicion: null,
    };
    this.usuariosService
      .syncListaUsuariosToPromise(this.usuariosService.usuarioActual.Cod_Usuario)
      .then((usuarios) => {
        this.usuariosService.usuarios = usuarios;
        this.cerrarModal();
      });
  }

  onOpenMenu(cancha) {}

  consultarFiltro(form: NgForm) {
    let data = form.value;
    this.filtro.Codigo_Pais = data.Codigo_Pais;
    this.filtro.Codigo_Estado = data.Codigo_Estado;
    this.filtro.Codigo_Ciudad = data.Codigo_Ciudad;
    this.filtro.Codigo_Posicion = data.Codigo_Posicion;
    this.usuariosService
      .syncfiltrarUsuariosToPromise(this.filtro)
      .then((usuarios) => {
        this.usuariosService.usuarios = usuarios;
        this.cerrarModal();
      });
  }

  cerrarModal() {
    this.modalCtrl.dismiss({
      Codigo_Pais: this.filtro.Codigo_Pais,
      Codigo_Estado: this.filtro.Codigo_Estado,
      Codigo_Ciudad: this.filtro.Codigo_Ciudad,
      Codigo_Posicion: this.filtro.Codigo_Posicion,
    });
  }
}