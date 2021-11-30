import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpcionesComponent } from '../components/opciones/opciones.component';
import { ClubService } from './club.service';
import { JugadoresClubesService } from './jugador-clubes.service';
import { SolicitudesService } from './solicitudes.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {

  constructor(public modalCtrl: ModalController, public clubService: ClubService, public userService: UserService, public solicitudesService: SolicitudesService, public jugadoresClubesService: JugadoresClubesService) { }


  async opciones(titulo,opciones){



    const modal = await this.modalCtrl.create({
      component: OpcionesComponent,
      cssClass: 'bottom-modal',
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
      componentProps: {
       titulo: titulo,
       opciones:opciones
      }
      
  
    });
  
    return await modal.present();
  }

  funciones(funcion, parametros){
    this.modalCtrl.dismiss();
    switch(funcion) {
    
      case 'verClub':
   
        this.clubService.verClub(parametros.arreglo);
        break;
      case 'agregarClub':

        this.clubService.agregarClub(parametros.clubID);

        break;
        case 'enviarRetoClub':
  
         this.clubService.enviarRetoClub(parametros.arreglo);
          break;
          case 'marcarFavorito':
            // code block
            break;
            case 'verUsuario':
    
            
              this.userService.verUsuario(parametros.userID);
              break;
            case 'agregarUsuario':
          
              this.solicitudesService.agregarUsuarioSolitud(parametros.solicitud);
      
              break;
              case 'eliminarSolicitud':
          
               this.solicitudesService.eliminarSolicitud(parametros.solicitudId);
                break;
                case 'clubAdmin':
              
                  this.clubService.makeAdmin(parametros.jugadorID);
           
                  break;
                  case 'deletePlayer':
   
                   this.jugadoresClubesService.deletePlayer(parametros.jugadorID);
                    break;
      default:
        // code block
    }
    
    
    }
    


}
