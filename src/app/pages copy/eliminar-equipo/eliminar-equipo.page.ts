import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-eliminar-equipo',
  templateUrl: './eliminar-equipo.page.html',
  styleUrls: ['./eliminar-equipo.page.scss'],
})
export class EliminarEquipoPage implements OnInit {
@Input() equipo;
  constructor(
public modalCtrl: ModalController,
public equiposService: EquiposService,
public usuariosService: UsuariosService,
public router: Router,
public alertasService: AlertasService

  ) { }

  ngOnInit() {
  }
  cerrarModal(){

    this.modalCtrl.dismiss();
      }

      eliminarEquipo(){
        this.equiposService.syncDeleteEquipoToPromise(this.equipo.Cod_Equipo).then (resp =>{
      
          this.equiposService.SyncMisEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(equipos =>{
            this.equiposService.misEquipos = equipos;
         
            if(equipos.length == 0 ){
              this.router.navigate(['/futplay/mi-perfil']);
            }else{
              this.equiposService.perfilEquipo = equipos[0];
            
        
        
        
            }
            this.alertasService.message('FUTPLAY', 'El equipo se borro con exito.');
          })
          this.modalCtrl.dismiss(null,null,'perfil-equipo');
          this.modalCtrl.dismiss({
            data:true
          });
          
        }, error =>{
          this.modalCtrl.dismiss();
          this.alertasService.message('FUTPLAY', 'Lo sentimos no se pudo eliminar el equipo, aun se encuentran reservaciones activas las cuales deben de ser verificadas, revisa el historial de reservaciones en revisión para mas detalles');
        })
      }
}
