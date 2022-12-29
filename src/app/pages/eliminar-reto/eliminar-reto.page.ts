import { Component, Input, OnInit } from '@angular/core';
import { ReservacionesService } from '../../services/reservaciones.service';
import { EmailService } from '../../services/email.service';
import { AlertasService } from '../../services/alertas.service';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-eliminar-reto',
  templateUrl: './eliminar-reto.page.html',
  styleUrls: ['./eliminar-reto.page.scss'],
})
export class EliminarRetoPage implements OnInit {
@Input() reto:PerfilReservaciones
  constructor(
public reservacionesService:ReservacionesService,
public emailService:EmailService,
public alertasService: AlertasService,
public modalCtrl: ModalController
  ) { }

  ngOnInit() {
 

  }
  cerrarModal(){
this.modalCtrl.dismiss(true);
  }


  
  eliminarReto() {
    // Calculate milliseconds in a year
    // 1 segundos
    const second = 1000;
    // 60 segundos
    const minute = 60;
    // 60 minutos
    const hour =  60;
    const day = 24;
    const year = 365;
    let today = new Date();
    let newDate = new Date(this.reto.reservacion.Hora_Inicio);
    let difference =  newDate.getTime() - today.getTime() ;
    let TotalHours = Math.ceil(difference / (1000 * 3600));
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    console.log('difference',difference)

    if(TotalHours >= 24 || this.reto.reservacion.Cod_Estado ==2){

      this.reservacionesService.syncDeleteReservacion(this.reto.reservacion.Cod_Reservacion).then((resp:any) =>{

        let mensaje = resp.message;
      
        if(this.reto.reservacion.Cod_Reservacion == 2){
          this.alertasService.presentaLoading('Gestionando cambios..')
      
          this.emailService.enviarCorreoReservaciones(3, this.reto.usuario_rival.Correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp =>{
            this.alertasService.loadingDissmiss();
            this.alertasService.message('FUTPLAY', mensaje)
            this.cerrarModal();
       
          
          }, error =>{
            this.alertasService.loadingDissmiss();
            this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
          })
      
        }else{
      
          this.alertasService.presentaLoading('Gestionando cambios..')
      
          this.emailService.enviarCorreoReservaciones(3, this.reto.usuario_rival.Correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp =>{
            this.emailService.enviarCorreoReservaciones(3, this.reto.usuario_retador.Correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp =>{
          
              this.emailService.enviarCorreoReservaciones(3, this.reto.correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp =>{
                this.alertasService.loadingDissmiss();
                this.alertasService.message('FUTPLAY', mensaje)
                this.cerrarModal();
           
                
                    console.log('reto aceptado', mensaje)
          
              }, error =>{
                this.alertasService.loadingDissmiss();
                this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
              })
          
            }, error =>{
              this.alertasService.loadingDissmiss();
              this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
            })
          
          
          }, error =>{
            this.alertasService.loadingDissmiss();
            this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
          })
      
        }
      
      
      
      })
      return
    }
    
    console.log(this.reto)
    this.alertasService.message('FUTPLAY', 'Las reservaciones se deben de cancelar 24 horas antes.')
    return
    
    
    }



}
