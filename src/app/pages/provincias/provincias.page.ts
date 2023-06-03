import { Component, OnInit } from '@angular/core';
import { Provincias } from '../../models/provincias';
import { AlertasService } from '../../services/alertas.service';
import { ProvinciasService } from '../../services/provincias.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.page.html',
  styleUrls: ['./provincias.page.scss'],
})
export class ProvinciasPage implements OnInit {
provincias:Provincias[]=[];

  constructor(
  public modalCtrl:ModalController,
  public alertasService:AlertasService,
  public provinviasService:ProvinciasService  
  ) { }


  ngOnInit() {
    this.alertasService.presentaLoading('Cargando provincias..');
    this.provinviasService.syncProvinciasPromise().then(provincias =>{
      this.provincias = provincias;
      this.alertasService.loadingDissmiss();
    }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal!..')
    })
  }





}
