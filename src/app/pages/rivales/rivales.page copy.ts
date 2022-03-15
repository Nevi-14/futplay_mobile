import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import { ClubInfoComponent } from '../../components/club-info/club-info.component';
import { EquiposService } from 'src/app/services/equipos.service';
import { ListaEquiposService } from '../../services/lista-equipos.service';

@Component({
  selector: 'app-rivales',
  templateUrl: './rivales.page.html',
  styleUrls: ['./rivales.page.scss'],
})
export class RivalesPage implements OnInit {

  titulo = 'Lista de Rivales';
  
  constructor(public club: EquiposService,public modalCtrl: ModalController,public route: ActivatedRoute,public router: Router,

    public listaEquiposService: ListaEquiposService
    
    
    ) {

  /**
   *   this.route.queryParams.subscribe(params => {
      if (params && params.header) {
       this.header = params.header;
       this.titulo = params.titulo;
        
      }
    });
   */
   }

  ngOnInit() {
    this.listaEquiposService.SyncEquipos();
    this.club.SyncEquipos();
    console.log(this.club.club)
  }

 
  async send(club){
     const modal = await this.modalCtrl.create({
      component: ClubInfoComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        club: club
      }
    });
    return await modal.present();
  }
  async filterModal(){
    const modal = await this.modalCtrl.create({
     component: FilterPage,
     cssClass: 'my-custom-class'
   });
   return await modal.present();
 }

}
