import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
equipos = [];
textoBuscar = '';
url = environment.archivosURL;
clasificaciones =false;
  constructor(
public modalCtrl:ModalController,
public equiposService:EquiposService,
public alertasService:AlertasService

  ) { }

  segmentChanged($event){
    if($event.detail.value == 'ranking'){
      this.clasificaciones = true;
    }else{
      this.clasificaciones = false;
    }
  }
  ngOnInit() {
    this.alertasService.presentaLoading('Cargando equipos...');
    this.equiposService.syncClasificacionEquiposToPromise().then((data) => {
      this.equipos = data;
      this.alertasService.loadingDissmiss(); 
      console.log(this.equipos);
    }, error => {
      this.alertasService.loadingDissmiss();
      this.alertasService.message("FUTPLAY", "Error al cargar los equipos, intente de nuevo más tarde");

    })
  }
  filledStars(stars: number) {
    return new Array(stars);
  }
  emptyStars(stars: number) {
    let value = 5 - stars;
    return new Array(value);
  }  getOrdinal(number) {
    if (typeof number !== 'number') {
        return 'Please provide a valid number.';
    }

    if (number % 100 >= 11 && number % 100 <= 13) {
        return number + 'th';
    }

    switch (number % 10) {
        case 1:
            return number + 'st';
        case 2:
            return number + 'nd';
        case 3:
            return number + 'rd';
        default:
            return number + 'th';
    }
}
}
