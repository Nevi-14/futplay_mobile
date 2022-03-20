import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { GestionRetos } from '../../models/gestionRetos';
import { ListaCanchas } from '../../models/listaCanchas';
import { HistorialPartidoService } from '../../services/historial-partido.service';
import { EvaluacionJugadorPage } from '../evaluacion-jugador/evaluacion-jugador.page';
import { HistorialPartido } from 'src/app/models/historialPartido';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  stadiumProfile =  'assets/main/stadium-profile.svg';
  soccer= 'assets/icon/soccer.svg';
  @Input() reto: GestionRetos
  @Input() cancha : ListaCanchas
  @Input() retador: vistaEquipos
  @Input() rival;
  retadorPopUp: vistaEquipos
  @Input() equipo : vistaEquipos
  @Input() partido : HistorialPartido
  constructor(
public modalCtrl: ModalController,
public usuariosSerice:UsuariosService,
public historialPartidoService: HistorialPartidoService,
public equiposService: EquiposService


  ) { }

  ngOnInit() {
    console.log(this.partido,'this.partido')
  
  //  this.historialPartidoService.startTimer( );
   if( this.retador.Cod_Usuario == this.usuariosSerice.usuarioActual.Cod_Usuario){
     this.retadorPopUp = this.rival;
   }else{
    this.retadorPopUp = this.retador;
   }

    console.log('equipo', this.equipo)
    
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }


  sumarMarcador(){


    if(this.reto.Cod_Usuario_Rival == this.usuariosSerice.usuarioActual.Cod_Usuario){

    this.partido.Goles_Rival += 1;
    this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);
    }else{

      this.partido.Goles_Retador += 1;
      this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);

    }

    console.log(this.partido,'this.partido sumarMarcador')
  }
  restarMarcador(){


    if(this.reto.Cod_Usuario_Rival == this.usuariosSerice.usuarioActual.Cod_Usuario){

    this.partido.Goles_Rival -= 1;

    this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);

    }else{

      this.partido.Goles_Retador -= 1;
      this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);

    }
    console.log(this.partido,'this.partido restarMarcador')
  }

  evaluacionIndividual(){
  if(this.reto.Cod_Usuario_Rival == this.usuariosSerice.usuarioActual.Cod_Usuario){

     // reatdor

     this.equiposService.SyncJugadoresEquipos(this.reto.Cod_Retador).then( jugadores =>{

      this.evaluacion(jugadores, this.retador, this.partido);

      
    })


   

    }else{


    // rival

    this.equiposService.SyncJugadoresEquipos(this.reto.Cod_Rival).then( jugadores =>{

      this.evaluacion(jugadores, this.rival, this.partido);
    })

    }



  }


  async evaluacion(jugadores,equipo,partido){

    this.modalCtrl.dismiss();
    
    const modal = await this.modalCtrl.create({
      component:EvaluacionJugadorPage,
      cssClass:'my-custom-class',
      componentProps:{
        jugadores:jugadores,
        equipo:equipo,
        partido:partido
      }

    })

    return await modal.present();
  }

}