import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController, PopoverController, AlertController } from '@ionic/angular';
import { Email } from 'src/app/models/email';
import { AlertasService } from 'src/app/services/alertas.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { EmailService } from 'src/app/services/email.service';
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
     public alertCTrl: AlertController,
     private cdr: ChangeDetectorRef,
     public autenticacionservice: AutenticacionService,
     public emailService: EmailService) {
    
 
  }

   
  ionViewWillEnter(){
    this.cdr.detectChanges();
    this.solicitudesService.syncGetSolicitudesJugadores(this.userService.usuarioActual.Cod_Usuario, false,true, true)
  }  
  AfterViewInit(){
    this.cdr.detectChanges();
  }


  reloadImage(){
    this.http.get(this.imageURL).subscribe(res => {
      console.log(res, 'image loaded from profile');
    })

  }
  async presentAlertPrompt() {
    const alert2 = await this.alertCTrl.create({
      cssClass: 'alertCancel',
      mode:'ios',
      header: 'Cambiar Contraseña',
      message:'Gestion de contraseña',
      inputs: [

        {
          name: 'nueva_contrasena',
          type: 'password',
          id: 'nueva_contrasena-id',
          placeholder: 'nueva contraseña',
          value:''
        },
        // multiline input.
        {
          name: 'confirmar_contrasena',
          id: 'confirmar_contrasena',
          type: 'password',
          placeholder: 'confirmar contraseña',
          value:''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (alertData) => {
            console.log('Confirm Cancel');
          
          }
        }, {
          text: 'Confirmar',
          handler: (alertData) => {

            if(alertData.nueva_contrasena == "" || alertData.confirmar_contrasena == ""){
             

              return this.presentAlertPrompt();
            }



this.Contrasena = alertData.nueva_contrasena;

            let codigo = String(new Date().getHours()) + String(new Date().getMinutes()) +String(new Date().getMilliseconds());
            this.email.Body =  this.email.Body + codigo;
        this.alertasService.presentaLoading('Validando datos')
        
            this.emailService.syncPostEmail(this.email).then(resp =>{
           this.alertasService.loadingDissmiss();
           this.autenticacionservice.actulizarTokenPromise(resp, codigo, new Date().getHours()).then(resp =>{
            this.validarCodigo();
          
          })
  
        
              
            }, error =>{
              this.alertasService.loadingDissmiss();
              this.alertasService.message('Futplay','Lo sentimos algo salio mal!');
        
            })






            console.log(alertData);
          }
        }
      ]
    });

    await alert2.present();
  }


  async validarCodigo() {
    const alert2 = await this.alertCTrl.create({
      cssClass: 'my-custom-class',
      mode:'ios',
      header: 'Codigo de verificación',
      subHeader:'Se envio un codigo a su correo',
      message: 'Revisa tu correo',
      inputs: [

        {
          name: 'codigo',
          type: 'text',
          id:   'codigo-id',
          placeholder: 'codigo verificacion',
          value:''
        },
       
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (alertData) => {
            console.log('Confirm Cancel');
          
          }
        }, {
          text: 'Confirmar',
          handler: (alertData) => {
            if(alertData.codigo == ""){
             

              return this.validarCodigo();
            }

            this.autenticacionservice.actualizarContrasenaPromise(alertData.codigo, this.userService.hashPassword(this.Contrasena)).then(resp =>{
              this.codigo = '';
              this.Contrasena = '';

              console.log('passwrd change', resp)
     
            this.alertasService.message('FUTPLAY', 'Contrasena cambiada')
            
            
              })
            console.log(alertData);
          }
        }
      ]
    });

    await alert2.present();
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
        this.presentAlertPrompt();
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
