import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CrearEquipoPage } from '../crear-equipo/crear-equipo.page';
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
 
      this.equiposService.SyncMisEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
        this.equiposService.misEquipos = resp.slice(0);
        this.equiposService.perfilEquipo = null;
        this.equiposService.perfilEquipo = this.equiposService.misEquipos[0];
        console.log('mis equipos', this.equiposService.misEquipos)
   
    if(resp.length == 0 ){
      this.crearEquipo();

    }else{
console.log('this.equiposService.perfilEquipo ',this.equiposService.perfilEquipo )
      this.router.navigate(['/futplay/perfil-equipo']);
    



    }

     
      }, error =>{
     
        this.alertasService.message('FUTLAY', 'Error cargando datos...');
     
      })
        
      }
    
     async  crearEquipo(){
 const modal = await this.modalCtrl.create({
   component:CrearUnirseEquipoPage,
   cssClass:'my-custom-modal',
   //id:'create-modal'
 });

 await modal.present();
    const { data } = await modal.onDidDismiss();
 
    if(data !== undefined ){
      console.log(data,'data')
//this.misEquipos();
    
    }
 
     }

equipos(){
  this.equiposService.equipos  = [];

  this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{

    this.equiposService.equipos = resp.slice(0);
  }, error =>{
 
    this.alertasService.message('FUTLAY', 'Error cargando datos...');
  })
    
  }
  canchas(){
 this.canchasService.syncCanchas();
   
    
  }

}
