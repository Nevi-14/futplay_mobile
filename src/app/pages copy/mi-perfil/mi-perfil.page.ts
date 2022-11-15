import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController, PopoverController, AlertController } from '@ionic/angular';
import { Email } from 'src/app/models/email';
import { AlertasService } from 'src/app/services/alertas.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { EmailService } from 'src/app/services/email.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { GestorImagenesService } from 'src/app/services/gestor-imagenes.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { StorageService } from 'src/app/services/storage-service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarPerfilUsuarioPage } from '../editar-perfil-usuario/editar-perfil-usuario.page';
import { SolicitudesJugadoresPage } from '../solicitudes-jugadores/solicitudes-jugadores.page';
import { CambiarContrasenaPage } from '../cambiar-contrasena/cambiar-contrasena.page';
import { CodigoSeguridadPage } from '../codigo-seguridad/codigo-seguridad.page';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage  {
  email:Email = 
  {
    ToEmail:this.userService.usuarioActual.Correo,
    Subject:'Recuperar Contraseña',
    Body:'Código de verificarión : '
  }
  verificarCodigo:boolean = false;
  codigo = '';
  Contrasena = '';


  constructor(
    public popoverCtrl: PopoverController,
    public userService: UsuariosService, 
    public modalCtrl: ModalController, 
    public equiposService: EquiposService, 
    public solicitudesService:SolicitudesService, 
    public actionSheetCtrl: ActionSheetController, 
    public http: HttpClient, 
    public gestorImagenesService:GestorImagenesService,
     public alertasService: AlertasService, 
     public alertCTrl: AlertController,
     private cdr: ChangeDetectorRef,
     public autenticacionservice: AutenticacionService,
     public emailService: EmailService,
     public storageService: StorageService) {
    
 
  }

   
  ionViewWillEnter(){
    console.log(this.userService.usuarioActual, 'user');
    this.cdr.detectChanges();
    this.getImage();
    this.solicitudesService.syncGetSolicitudesJugadores(this.userService.usuarioActual.Cod_Usuario, false,true, true)
  }  
  AfterViewInit(){
    this.getImage();
    this.cdr.detectChanges();
  }
  async cambiarContrasena() {
    const modal = await this.modalCtrl.create({
      component: CambiarContrasenaPage,
      breakpoints: [0, 0.5, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();

    const {data } = await modal.onDidDismiss();

    if(data != undefined){

      this.Contrasena = data.contrasena;

      let codigo = String(new Date().getHours()) + String(new Date().getMinutes()) +String(new Date().getMilliseconds());
      this.email.Body =  this.email.Body + codigo;
      this.alertasService.presentaLoading('Validando datos')
      
      this.emailService.syncToPromiseSendEmail(this.email).then(resp =>{
      this.alertasService.loadingDissmiss();
      this.autenticacionservice.actulizarTokenPromise(this.userService.usuarioActual.Cod_Usuario, codigo, new Date().getHours()).then(resp =>{
      this.securityCode();
      
      })
      
      
        
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('Futplay','Lo sentimos algo salio mal!');
      
      })
      

    }

  }

  async securityCode() {
    const modal = await this.modalCtrl.create({
      component: CodigoSeguridadPage,
      breakpoints: [0, 0.5, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();

    const {data } = await modal.onDidDismiss();

    if(data != undefined){

      this.codigo = data.codigo;
      this.autenticacionservice.actualizarContrasenaPromise(data.codigo, this.userService.hashPassword(this.Contrasena)).then(resp =>{
        this.codigo = '';
        this.Contrasena = '';

        console.log('passwrd change', resp)

      this.alertasService.message('FUTPLAY', 'La contraseña se cambio con exito!.')
      
      
        })


    }

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
        this.cambiarContrasena();
            }
           
           },
           {   
            text: 'Validar Codigo De Seguridad',
            icon:'arrow-forward-outline',
            handler: () =>{
        // this.gestionarContrasena();
        this.securityCode();
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
    this.getImage();
    }


    dateF(){
      return new Date().getTime() 
    }

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
    getImage(){

      console.log(this.userService.usuarioActual, 'usuario actual')
      console.log('foto', this.userService.usuarioActual.Foto)
      let url = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/';
      
          if(!this.userService.usuarioActual.Avatar ){
      
            this.userService.userPic =   url+this.userService.usuarioActual.Foto+"?"+ new Date().getTime();
          }else{
      
            this.userService.userPic =   'assets/profile/avatars/' + this.userService.usuarioActual.Foto;
          }
      
      
        }

}
