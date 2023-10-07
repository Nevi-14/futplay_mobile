import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaCanchasService } from '../../services/categoria-canchas.service';
import { CanchasService } from '../../services/canchas.service';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtro-cancha',
  templateUrl: './filtro-cancha.page.html',
  styleUrls: ['./filtro-cancha.page.scss'],
})
export class FiltroCanchaPage implements OnInit {
  @Input() Codigo_Pais: number;
  @Input() Codigo_Estado: number;
  @Input() Codigo_Ciudad: number;
  @Input() Cod_Categoria: number;
  categorias = [];
  filtro = {
    Codigo_Pais: null,
    Codigo_Estado: null,
    Codigo_Ciudad: null,
    Cod_Categoria: null,
  };

  constructor(
    public categoriasCanchasService: CategoriaCanchasService,
    public modalCtrl: ModalController,
    public canchasService: CanchasService,
    public geolocalizacionService: GeolocalizacionService
  ) {}

  ngOnInit() {
    this.geolocalizacionService.loadCountries();

    this.categoriasCanchasService
      .syncCategoriaCanchasToPromise()
      .then((categorias) => {
        categorias.forEach((categoria) => {
          let cat = {
            id: categoria.Cod_Categoria,
            valor: categoria.Nombre,
          };
          this.categorias.push(cat);
        });
      });
  }

  onChangeDistritos($event) {
    this.filtro.Codigo_Pais = $event.target.value;
  }

  limpiarDatos() {
    this.filtro = {
      Codigo_Pais: null,
      Codigo_Estado: null,
      Codigo_Ciudad: null,
      Cod_Categoria: null,
    };
    this.canchasService.syncListaCanchasToPromise().then((canchas) => {
      this.canchasService.canchas = canchas;
      this.cerrarModal();
    });
  }

  onOpenMenu(cancha) {}

  consultarFiltro(form: NgForm) {
    let data = form.value;
    console.log(data, 'data');
    this.filtro.Codigo_Pais = data.Codigo_Pais;
    this.filtro.Codigo_Estado = data.Codigo_Estado;
    this.filtro.Codigo_Ciudad = data.Codigo_Ciudad;
    this.filtro.Cod_Categoria = data.Cod_Categoria;
    this.canchasService
      .syncFintroListaCanchasToPromise(this.filtro)
      .then((canchas) => {
        this.canchasService.canchas = canchas;
        this.cerrarModal();
      });
  }

  cerrarModal() {
    console.log(this.filtro, 'cerrar fil');
    this.modalCtrl.dismiss({
      Codigo_Pais: this.filtro.Codigo_Pais,
      Codigo_Estado: this.filtro.Codigo_Estado,
      Codigo_Ciudad: this.filtro.Codigo_Ciudad,
      Cod_Categoria: this.filtro.Cod_Categoria,
    });
  }
}