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
        let difference = today.getTime() - newDate.getTime() ;
        let TotalHours = Math.ceil(difference / (1000 * 3600));
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        
        if(TotalHours >= 24){
        
          this.gestionReservacionesService.syncDeleteConfirmacionReservacion(this.reto).then(resp =>{
            this.modalCtrl.dismiss();
          })
          return
        }
        
        console.log(this.reto)
        this.alertasService.message('FUTPLAY', 'Las reservaciones se deben de cancelar 24 horas antes.')
        return
        
        
        }
}
