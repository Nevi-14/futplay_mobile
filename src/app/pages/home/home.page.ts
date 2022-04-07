import { Component, OnInit } from '@angular/core';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public modalCtrl:ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService,
    public canchasService: CanchasService
    
    
    
    ) { }

  ngOnInit( ) {

  }
  profile(){
    //   this.equiposService.new = true;
   //this.equiposService.perfilEquipo = null;
       this.equiposService.SyncMisEquipos(this.usuariosService.usuarioActual.Cod_Usuario)
   
     }

  misEquipos(){
 //   this.equiposService.new = true;
//this.equiposService.perfilEquipo = null;


  }



equipos(){
  this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario)
    
  }
  canchas(){
 this.canchasService.syncCanchas();
   
    
  }
}
