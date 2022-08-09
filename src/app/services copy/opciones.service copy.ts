import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { JoinClubComponent } from '../components/join-club-component/join-club-component';
import { OpcionesComponent } from '../components/opciones/opciones.component';
import { EquiposService } from './equipos.service';
import { JugadoresEquiposService } from './jugadoresEquipos.service';

import { UsuariosService } from './usuarios.service';
import { ReservacionesService } from './reservaciones.service';
import { RetoDetallePage } from '../pages/reto-detalle/reto-detalle.page';
import { CanchaDetallePage } from '../pages/cancha-detalle/cancha-detalle.page';
import { SolicitudesJugadoresEquiposService } from './solicitudesJugadoresEquipos.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {
  modalActual : any
  constructor(public modalCtrl: ModalController, public clubService: EquiposService, public userService: UsuariosService, public solicitudesService: SolicitudesJugadoresEquiposService, public jugadoresClubesService: JugadoresEquiposService,public router: Router, public retoService: ReservacionesService, public equiposService: EquiposService) { }


  async opciones(titulo,opciones){



    const modal = await this.modalCtrl.create({
      component: OpcionesComponent,
      cssClass: 'autoheight-modal-bottom',
      backdropDismiss: true,
      swipeToClose:true,
      animated: true,
      componentProps: {
       titulo: titulo,
       opciones:opciones
      }
      
  
    });
  
    modal.present();
    let modalReady = false;
    modal.onDidDismiss().then((data)=>{
     if(data.data != undefined ){

      this.modalCtrl.dismiss();
     }
   })

 
  }

  funciones(funcion, parametros){

    switch(funcion) {
    
      // INICIO OPCIONES DE PERFIL

      case  'gestionarPerfil':
     //   this.userService.gestionarPerfil();
        break;

        case  'gestionarContrasena':
          this.modalCtrl.dismiss();
         // this.userService.gestionarContrasena();
          break;
          
          case  'gestionarMetodosDePago':
            this.modalCtrl.dismiss();
           // this.userService.gestionarMetodosDePago();
            break;

            case  'cerrarSession':
           //   this.userService.cerrarSession();
              break;

  

                // FIN  OPCIONES DE PERFIL
      case 'verClub':
        this.modalCtrl.dismiss();
        this.clubService.verClub(parametros.arreglo);
        break;
      case 'agregarClub':
        this.modalCtrl.dismiss();
        console.log(parametros)
        this.clubService.agregarClub(parametros.equipoID);
    this.solicitudesService.delete(parametros.solicitudID);
  this.equiposService.clubCount(parametros.solicitudID);


        break;
        case 'enviarRetoClub1':
      //    this.retoService.rival1 =  parametros.arreglo; 
        
         // console.log(parametros.arreglo)
           this.modalCtrl.dismiss();
         this.modalActual.dismiss()
        
      
   
      

        // this.clubService.enviarRetoClub(parametros.arreglo);
          break;
          
          case 'enviarRetoClub2':
         //   this.retoService.rival2 =  parametros.arreglo; 
             this.modalCtrl.dismiss();
           this.modalActual.dismiss()
          
        
     
        
  
          // this.clubService.enviarRetoClub(parametros.arreglo);
            break;
          case 'marcarFavorito':
            // code block
            break;
            case 'verUsuario':
    
              this.modalCtrl.dismiss();
          //    this.userService.verUsuario(parametros.userID);
              break;
            case 'agregarUsuario':
        //  this.userService.agregarUsuarioSolitud(parametros.solicitud);
          this.solicitudesService.delete(parametros.solicitud);
          this.equiposService.clubCount(parametros.solicitud);
          this.modalCtrl.dismiss();
          this.modalActual.dismiss();
              break;
              case 'eliminarSolicitud':
                this.modalCtrl.dismiss();
               this.solicitudesService.eliminarSolicitud(parametros.solicitudId);
                break;
                case 'clubAdmin':
                  this.modalCtrl.dismiss();
              //    this.clubService.makeAdmin(parametros.jugadorID);
           
                  break;
                  case 'deletePlayer':
                    this.modalCtrl.dismiss();
                   this.jugadoresClubesService.deletePlayer(parametros.jugadorID);
                    break;
                    case 'agregarRival':
                      this.modalCtrl.dismiss();
                    alert('helo')
                      break;
                    case 'reservarCancha':
                      this.modalCtrl.dismiss();

                      this.retoService.cancha = parametros.canchaId
                      this.router.navigate(['/calendar-page'])
//this.equiposModal();
                    break;
                    case 'verReto':
                    this.retoDetalle(parametros.reto)
                    break;
                  case 'verCancha':
     this.canchaDetalle(parametros.arreglo);
                  break;
                  
      default:
        // code block
    }
    
    
    }
    
    async equiposModal(identificador){


      const modal = await this.modalCtrl.create({
        component: JoinClubComponent,
        cssClass: 'custom-class',
        backdropDismiss: true,
        swipeToClose:true,
        animated: true,
        componentProps: {
          header:true,
          titulo:'Seleccionar Equipo',
          equipo: identificador,
          rival: identificador === 1 ? true : false
        }
        
    
      });
    
      this.modalActual = modal;
       this.modalActual.present();



      
    }

        
    async retoDetalle(reto){


      const modal = await this.modalCtrl.create({
        component: RetoDetallePage,
        cssClass: 'custom-class',
        backdropDismiss: true,
        swipeToClose:true,
        animated: true,
        componentProps: {
          reto:reto
        }
        
    
      });
    
      this.modalActual = modal;
       this.modalActual.present();



      
    }
    async canchaDetalle(cancha){


      const modal = await this.modalCtrl.create({
        component: CanchaDetallePage,
        cssClass: 'custom-class',
        backdropDismiss: true,
        swipeToClose:false,
        animated: true,
        componentProps: {
          cancha:cancha
        }
        
    
      });
    
      this.modalActual = modal;
       this.modalActual.present();



      
    }

}
