import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController, ActionSheetButton, ActionSheetController } from '@ionic/angular';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { GlobalService } from 'src/app/services/global.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesEquiposPage } from '../solicitudes-equipos/solicitudes-equipos.page';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { SolicitudesJugadoresPage } from '../solicitudes-jugadores/solicitudes-jugadores.page';
import { EditarPerfilUsuarioPage } from '../editar-perfil-usuario/editar-perfil-usuario.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:8101/..assets/photos"
    }
};

  constructor(public popoverCtrl: PopoverController,public userService: UsuariosService, public modalCtrl: ModalController, public globalService: GlobalService, public equiposService: EquiposService, public solicitudesService:SolicitudesService, public actionSheetCtrl: ActionSheetController) {
    

    
  }

  ngOnInit() {
    
    this.equiposService.SyncMisEquipos(this.userService.usuarioActual.Cod_Usuario)
   // this.equiposService.checkIfHasClub();
  }

  uploadPicture(){

  }

  async soliitudes(){


    const modal = await this.modalCtrl.create({

      component:SolicitudesJugadoresPage,
      cssClass:'my-custom-modal',
    });


    return await modal.present();

  }


     // INICIO MENU DE OPCIONES RELACIONADAS AL PERFIL DE USUARIO
  
  
     async onOpenMenu(){
  
  
      const normalBtns : ActionSheetButton[] = [
        {   
           text: 'Editar Perfil',
           icon:'create-outline',
           handler: () =>{
   this.gestionarPerfil();
           }
          
          },
          {   
            text: 'Modo Claro',
            icon:'sunny-outline',
            handler: () =>{
  
            }
           
           },
           {   
            text: 'Modo Oscuro',
            icon:'moon-outline',
            handler: () =>{
   
            }
           
           },
          {   
            text: 'Gestionar Contraseñas',
            icon:'lock-closed-outline',
            handler: () =>{
        // this.gestionarContrasena();
            }
           
           },
           {   
            text: 'Metodos de Pago',
            icon:'card-outline',
            handler: () =>{
    //    this.gestionarMetodosDePago();
            }
          },
          {   
            text: 'Cerrar Sesión',
            icon:'log-out-outline',
            handler: () =>{
        this.userService.cerrarSession();
            } },
           {   
            text: 'Cancelar',
            icon:'close-outline',
           role:'cancel',
           
           }
        
          ]
    
    
    
    
      const actionSheet = await this.actionSheetCtrl.create({
        header:'Opciones',
        cssClass: 'left-align-buttons',
        buttons:normalBtns,
        mode:'ios'
      });
    
    
    
    
    
    await actionSheet.present();
    
    
      }
  
    // FIN MENU DE OPCIONES RELACIONADAS AL PERFIL DE USUARIO

   async  gestionarPerfil(){

    const modal = await this.modalCtrl.create({
      component:EditarPerfilUsuarioPage,
      componentProps:{
        usuario:this.userService.usuarioActual
      },
      cssClass:'my-custom-modal',
      id:'fecha-modal'
    });

    return await modal.present();

    }

}
