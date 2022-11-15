import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController, PopoverController, AlertController } from '@ionic/angular';
import { Email } from 'src/app/models/email';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarPerfilUsuarioPage } from '../editar-perfil-usuario/editar-perfil-usuario.page';
import { SolicitudesJugadoresPage } from '../solicitudes-jugadores/solicitudes-jugadores.page';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage  {
  
  constructor(
public usuariosService:UsuariosService,
public modalCtrl: ModalController,
public actionSheetCtrl: ActionSheetController

  ) { }
  calcularEdad(fechaNacimiento:Date){

    var dob = new Date(fechaNacimiento);
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();
  
  //convert the calculated difference in date format
  var age_dt = new Date(month_diff); 
  
  //extract year from date    
  var year = age_dt.getUTCFullYear();
  
  //now calculate the age of the user
  var age = Math.abs(year - 1970);
  
/**
 *   //display the calculated age
    let todayYear = new Date().getFullYear()
    let userYear = new Date(fechaNacimiento).getFullYear();
    let age = todayYear - userYear;
 */
return age;

  }

 

  calcularFecha(fecha){
    var dob = new Date(fecha);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    return age;
  }






  async soliitudes(){


    const modal = await this.modalCtrl.create({

      component:SolicitudesJugadoresPage,
      cssClass:'my-custom-modal',
      componentProps:{
        showReceiveInput:true,
        showSendInput:false
      }
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
            text: 'Gestionar Contraseñas',
            icon:'lock-closed-outline',
            handler: () =>{
        // this.gestionarContrasena();
       // this.cambiarContrasena();
            }
           
           },
           {   
            text: 'Validar Codigo De Seguridad',
            icon:'arrow-forward-outline',
            handler: () =>{
        // this.gestionarContrasena();
      //  this.securityCode();
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
    console.log(data)
 
    }


    dateF(){
      return new Date().getTime() 
    }

 



}
