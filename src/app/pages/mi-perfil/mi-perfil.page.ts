
import { Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarPerfilUsuarioPage } from '../editar-perfil-usuario/editar-perfil-usuario.page';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Router } from '@angular/router';
import { GestorContrasenaPage } from '../gestor-contrasena/gestor-contrasena.page';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage {
  img = null;
  constructor(
public usuariosService:UsuariosService,
public modalCtrl: ModalController,
public actionSheetCtrl: ActionSheetController,
public solicitudesService: SolicitudesService,
public router:Router

  ) { }

   ionViewWillEnter() {
    
this.cargarDatosUsuario();
  }

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
          text: 'Gestionar Contraseñas',
          icon:'lock-closed-outline',
          handler: () =>{
      this.gestionarContrasena();
          }
         
         },
        {   
          text: 'Cerrar Sesión',
          icon:'log-out-outline',
          handler: () =>{
      this.usuariosService.cerrarSession();
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
 
  async  gestionarContrasena(){

    const modal = await this.modalCtrl.create({
      component:GestorContrasenaPage,
      componentProps:{
        usuario:this.usuariosService.usuarioActual
      },
      cssClass:'my-custom-modal',
      id:'perfil-usuario'
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data)
 
    }
  async cargarDatosUsuario(){
    let usuario = await this.usuariosService.syncGetUsuario(this.usuariosService.usuarioActual.usuario.Cod_Usuario);
this.usuariosService.usuarioActual = usuario;
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
 
this.router.navigateByUrl('solicitudes-jugadores',{replaceUrl:true})
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
