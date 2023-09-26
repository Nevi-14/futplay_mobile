
import { Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarPerfilUsuarioPage } from '../editar-perfil-usuario/editar-perfil-usuario.page';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Router } from '@angular/router';
import { GestorContrasenaPage } from '../gestor-contrasena/gestor-contrasena.page';
import { UsuarioGeolocalizacion } from 'src/app/models/usuarioGeolocalizacion';
import { UsuariosGeolocalizacionService } from '../../services/usuarios-geolocalizacion.service';
import { UsuarioGeolocalizacionPage } from '../usuario-geolocalizacion/usuario-geolocalizacion.page';
import { SolicitudesJugadoresPage } from '../solicitudes-jugadores/solicitudes-jugadores.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage {
  img = null;
  modalOpen = false;
  usuarioGeolocalizacion:UsuarioGeolocalizacion
  constructor(
public usuariosService:UsuariosService,
public modalCtrl: ModalController,
public actionSheetCtrl: ActionSheetController,
public solicitudesService: SolicitudesService,
public router:Router,
public usuariosGeolocalizacionService:UsuariosGeolocalizacionService,
private translateService: TranslateService

  ) { }

   ionViewWillEnter() {
    
this.cargarDatosUsuario();
  }

  async onOpenMenu(){
  
    const normalBtns : ActionSheetButton[] = [
      {   
         text: this.translateService.instant('MANAGE_PROFILE'),
         icon:'create-outline',
         handler: () =>{
 this.gestionarPerfil();
         }
        
        },
        {   
          text: this.translateService.instant('MANAGE_PASSWORD'),
          icon:'lock-closed-outline',
          handler: () =>{
      this.gestionarContrasena();
          }
         
         },
        {   
          text: this.translateService.instant('LOGOUT'),
          icon:'log-out-outline',
          handler: () =>{
      this.usuariosService.cerrarSession();
          } },
         {   
          text: this.translateService.instant('CANCEL'),
          icon:'close-outline',
         role:'cancel',
         
         }
      
        ]
  
  
  
    const actionSheet = await this.actionSheetCtrl.create({
      header:this.translateService.instant('OPTIONS'),
      cssClass: 'left-align-buttons',
      buttons:normalBtns,
      mode:'ios'
    });
  
  
  
  
  
  await actionSheet.present();
  
  
    }
    async usuarioGeolocalizacionModal(){
      if (!this.modalOpen){
        const modal = await this.modalCtrl.create({
          component: UsuarioGeolocalizacionPage,
          backdropDismiss:false,
          cssClass:'alert-modal',
          mode:'md', 
          componentProps:{
            usuarioGeolocalizacion:this.usuarioGeolocalizacion
          }
      
        });
        this.modalOpen = true;
    
         await modal.present();
         const { data } = await modal.onWillDismiss();
    
         this.modalOpen = false;
      }
    
     }
  // FIN MENU DE OPCIONES RELACIONADAS AL PERFIL DE USUARIO
 
  async  gestionarContrasena(){

    const modal = await this.modalCtrl.create({
      component:GestorContrasenaPage,
      componentProps:{
        usuario:this.usuariosService.usuarioActual
      },
      cssClass:'my-custom-modal',
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data)
 
    }
  async cargarDatosUsuario(){
/**
 *     let usuario = await this.usuariosService.syncGetUsuario(this.usuariosService.usuarioActual.Cod_Usuario);
this.usuariosService.usuarioActual = usuario;
 */
this.usuariosGeolocalizacionService.syncGetUsuarioGeolocalizacionToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then( geolocalizacion =>{
  console.log(geolocalizacion,'geolocalizacion')
  this.usuarioGeolocalizacion = geolocalizacion[0]
})
  }
  calcularEdad(fechaNacimiento:Date){
  const dob = new Date(fechaNacimiento);
  //calculate month difference from current date in time
  const month_diff = Date.now() - dob.getTime();
  //convert the calculated difference in date format
  const age_dt = new Date(month_diff); 
  //extract year from date    
  const year = age_dt.getUTCFullYear();
  //now calculate the age of the user
  const age = Math.abs(year - 1970);
return age;
  }

 
  async solicitudes(){
    if (!this.modalOpen){
      const modal = await this.modalCtrl.create({
        component: SolicitudesJugadoresPage,
        cssClass:'alert-modal',
        mode:'md', 
    
      });
      this.modalOpen = true;
  
       await modal.present();
       const { data } = await modal.onWillDismiss();
  
       this.modalOpen = false;
    }
  
   }


   async  gestionarPerfil(){
    const modal = await this.modalCtrl.create({
      component:EditarPerfilUsuarioPage,
      componentProps:{
        usuario:this.usuariosService.usuarioActual
      },
      cssClass:'my-custom-modal',
      id:'perfil-usuario'
    });

     modal.present();
    const { data } = await modal.onWillDismiss();
     if(data != undefined) this.cargarDatosUsuario();
 
    }


}
