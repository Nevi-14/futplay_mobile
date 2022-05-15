import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CrearUnirseEquipoPage } from '../crear-unirse-equipo/crear-unirse-equipo.page';

@Component({
  selector: 'app-futplay',
  templateUrl: './futplay.page.html',
  styleUrls: ['./futplay.page.scss'],
})
export class FutplayPage implements OnInit {
  constructor(
    public modalCtrl:ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService,
    public canchasService: CanchasService,
    public router: Router,
    public alertasService: AlertasService
    
    
    
    ) { }

  ngOnInit( ) {

  }
  profile(){
    //   this.equiposService.new = true;
   //this.equiposService.perfilEquipo = null;
     this.usuariosService.syncDatos(this.usuariosService.usuarioActual.Cod_Usuario)
   
     }

     misEquipos(){
      this.equiposService.misEquipos = [];
    this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.SyncMisEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
        this.equiposService.misEquipos = resp.slice(0);
        
        this.alertasService.loadingDissmiss();
    if(resp.length == 0 ){
      this.crearUnirseEquipo();

    }else{
      this.equiposService.perfilEquipo = null;
      this.equiposService.perfilEquipo = this.equiposService.misEquipos[0];
      this.router.navigate(['/futplay/perfil-equipo']);
    



    }

     
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTLAY', 'Error cargando datos...');
     
      })
        
      }
    
     async  crearUnirseEquipo(){
 const modal = await this.modalCtrl.create({
   component:CrearUnirseEquipoPage,
   cssClass:'my-custom-modal'
 });

 return await modal.present();

     }

equipos(){
  this.equiposService.equipos  = [];
  this.alertasService.presentaLoading('Cargando datos...');
  this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
    this.alertasService.loadingDissmiss();
    this.equiposService.equipos = resp.slice(0);
  }, error =>{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTLAY', 'Error cargando datos...');
  })
    
  }
  canchas(){
 this.canchasService.syncCanchas();
   
    
  }

}
