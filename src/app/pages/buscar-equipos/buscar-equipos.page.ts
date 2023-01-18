import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import { Solicitudes } from 'src/app/models/solicitudes';
import { SolicitudesService } from '../../services/solicitudes.service';
import { AlertasService } from '../../services/alertas.service';
import { JugadoresService } from '../../services/jugadores.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage implements OnInit {
  textoBuscar = ''
  solicitud:Solicitudes = {

    Cod_Solicitud : null,
    Cod_Usuario :  this.usuariosService.usuarioActual.usuario.Cod_Usuario,
    Cod_Equipo :null,
    Confirmacion_Usuario:true,
    Confirmacion_Equipo:false,
    Estado:true
  }
  
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
  }
  constructor(
public equiposService:EquiposService,
public usuariosService:UsuariosService,
public modalCtrl:ModalController,
public actionSheetCtrl: ActionSheetController,
public solicitudesService: SolicitudesService,
public alertasService:AlertasService,
public jugadoresService: JugadoresService
  ) { }

  ngOnInit() {

    this.equiposService.syncListaEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp =>{
      this.equiposService.equipos = resp;


    })
      }

      cerrarModal(){

        this.modalCtrl.dismiss()
      }

      async filtroUbicacion(){

  
     
        const modal  = await this.modalCtrl.create({
         component: FiltroUbicacionPage,
         cssClass: 'my-custom-class',
         breakpoints: [0, 0.3, 0.5, 0.8],
         initialBreakpoint: 0.5,
         componentProps : {
          'Cod_Provincia': this.filtro.Cod_Provincia,
          'Cod_Canton': this.filtro.Cod_Canton,
          'Cod_Distrito': this.filtro.Cod_Distrito
         },
         
         id:'my-modal-id'
       });
    
       await modal .present();
    
       const { data } = await modal.onWillDismiss();
     console.log(data)
       if(data !== undefined ){
    
        this.filtro.Cod_Provincia = data.Cod_Provincia;
        this.filtro.Cod_Canton = data.Cod_Canton;
        this.filtro.Cod_Distrito = data.Cod_Distrito;
    
       }
     }
     onSearchChange(event){
      this.textoBuscar = event.detail.value;
  
    }
      EquipoSolicitud(equipo){

        this.jugadoresService.syncGetJugador(this.usuariosService.usuarioActual.usuario.Cod_Usuario,equipo.equipo.Cod_Equipo).then(resp =>{

          if(resp.length > 0){

return     this.alertasService.message('FUTPLAY', 'Lo sentimos no se puede enviar la solicitud, verifica que no seas parte del equipo o que no hayas enviado una solicitud.')
          }
          this.solicitud.Cod_Equipo = equipo.equipo.Cod_Equipo
    
          this.solicitudesService.generarSolicitud(this.solicitud).then(resp =>{
   
           this.alertasService.message('FUTPLAY', 'Solicitud Enviada')
          })
        })
     
  
       
      }
     
      async onOpenMenu(equipo){
        console.log(equipo)
        
            const normalBtns : ActionSheetButton[] = [
            
          
                {   
                  text: 'Enviar Solicitud',
                  icon:'paper-plane-outline',
                  handler: () =>{
                   // this.videoScreen(3);
                  // this.jugadorEquipoSolicitud(jugador)

                  this.EquipoSolicitud(equipo);
                  }
                 
                 },
                
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

          }
