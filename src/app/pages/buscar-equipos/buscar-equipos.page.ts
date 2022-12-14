import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import { Solicitudes } from 'src/app/models/solicitudes';
import { SolicitudesService } from '../../services/solicitudes.service';
import { AlertasService } from '../../services/alertas.service';

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
  constructor(
public equiposService:EquiposService,
public usuariosService:UsuariosService,
public modalCtrl:ModalController,
public actionSheetCtrl: ActionSheetController,
public solicitudesService: SolicitudesService,
public alertasService:AlertasService
  ) { }

  ngOnInit() {

    this.equiposService.syncListaEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp =>{
      this.equiposService.equipos = resp;


    })
      }

      cerrarModal(){

        this.modalCtrl.dismiss()
      }

      filtroUbicacion(){



      }
      EquipoSolicitud(equipo){
        this.solicitud.Cod_Equipo = equipo.equipo.Cod_Equipo
    
       this.solicitudesService.generarSolicitud(this.solicitud).then(resp =>{

        this.alertasService.message('FUTPLAY', 'Solicitud Enviada')
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
