import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { GestorImagenesService } from 'src/app/services/gestor-imagenes.service';
import { GlobalService } from 'src/app/services/global.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarPerfilUsuarioPage } from '../editar-perfil-usuario/editar-perfil-usuario.page';
import { SolicitudesJugadoresPage } from '../solicitudes-jugadores/solicitudes-jugadores.page';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {


  afuConfig = {
    uploadAPI: {
      url:"http://localhost:8101/..assets/photos"
    }
};
userPic = this.userService.usuarioActual.Foto ?  'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/' + this.userService.usuarioActual.Foto +'?'+ this.dateF() : 'assets/user.svg';
 

imageURL=  "https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/1651603295791.jpeg?" + new Date().getTime();
  constructor(
    public popoverCtrl: PopoverController,
    public userService: UsuariosService, 
    public modalCtrl: ModalController, 
    public globalService: GlobalService, 
    public equiposService: EquiposService, 
    public solicitudesService:SolicitudesService, 
    public actionSheetCtrl: ActionSheetController, 
    public http: HttpClient, 
    public gestorImagenesService:GestorImagenesService,
     public alertasService: AlertasService, 
     private cdr: ChangeDetectorRef) {
    
 
  }

  ngOnInit() {
    this.cdr.detectChanges();
 //   this.equiposService.SyncMisEquipos(this.userService.usuarioActual.Cod_Usuario)
  
   // this.equiposService.checkIfHasClub();
  }


  ngAfterContentChecked() {


  }    
  ionViewWillEnter(){
    this.cdr.detectChanges();
  }  
  AfterViewInit(){
    this.cdr.detectChanges();
  }
  uploadPicture(){

  }

  reloadImage(){
    this.http.get(this.imageURL).subscribe(res => {
      console.log(res, 'image loaded from profile');
    })

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
      id:'perfil-usuario'
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data)
    if(data != undefined){
   /**
    *    this.userService.usuarioActual.Foto = this.userService.usuarioActual.Foto;
    */
    this.cdr.detectChanges();
    this.userPic = 'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/'+ this.userService.usuarioActual.Foto +'?'+ this.dateF();
 
    }

    }


    dateF(){
      return new Date().getTime() 
    }

    calcularEdad(fechaNacimiento:Date){

     
      let todayYear = new Date().getFullYear()
      let userYear = new Date(fechaNacimiento).getFullYear();
      let age = todayYear - userYear;

return age;

    }
}
