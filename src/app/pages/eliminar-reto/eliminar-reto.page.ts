import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { GestionReservacionesService } from 'src/app/services/gestion-reservaciones.service';

@Component({
  selector: 'app-eliminar-reto',
  templateUrl: './eliminar-reto.page.html',
  styleUrls: ['./eliminar-reto.page.scss'],
})
export class EliminarRetoPage implements OnInit {
@Input() reto;
  constructor(
    public modalCtrl: ModalController,
    public gestionReservacionesService: GestionReservacionesService,
    public alertasService: AlertasService
  ) { }

  ngOnInit() {
  }
  cerrarModal(){

    this.modalCtrl.dismiss();
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
        let newDate = new Date(this.reto.Hora_Inicio);
        let difference =  newDate.getTime() - today.getTime() ;
        let TotalHours = Math.ceil(difference / (1000 * 3600));
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        console.log('difference',difference)
        if(TotalHours >= 24){
        
          this.gestionReservacionesService.syncDeleteReservacion(this.reto.Cod_Reservacion).then(resp =>{
            this.alertasService.message('FUTPLAY', 'La reservación se elimino con exito')
            this.modalCtrl.dismiss({data:true});
          }, error =>{
            console.log(error, 'error')
            this.modalCtrl.dismiss({data:true});
            this.alertasService.message('FUTPLAY', 'Lo sentimos, no se pudo eliminar la reservación. El equipo FUTPLAY revisara el detalle y te notificara, por favor verificar el estado en la sección de retos / revisión.')
          })
          return
        }
        
        console.log(this.reto)
        this.alertasService.message('FUTPLAY', 'Las reservaciones se deben de cancelar 24 horas antes.')
        return
        
        
        }
}
