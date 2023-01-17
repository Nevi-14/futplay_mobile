import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { EvaluacionEquipoPage } from '../evaluacion-equipo/evaluacion-equipo.page';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PartidoService } from 'src/app/services/partido.service';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { PerfilJugador } from '../../models/perfilJugador';
import { PerfilReservaciones } from '../../models/perfilReservaciones';

@Component({
  selector: 'app-evaluacion-jugador',
  templateUrl: './evaluacion-jugador.page.html',
  styleUrls: ['./evaluacion-jugador.page.scss'],
})
export class EvaluacionJugadorPage implements OnInit {
@Input() equipo:any
@Input() partido : any
@Input() reto:PerfilReservaciones
@ViewChild(IonSlides) slides: IonSlides;
jugadores:PerfilJugador[]
evaluacionJugador:any = {
  Cod_Historial_Jugador:null,
  Cod_Partido: 0,
  Jugador_Futplay: 0,
  Jugador_Del_Partido: 0

}
stadiumProfile =  'assets/main/player-profile.svg';
slideOpts = {
  allowTouchMove: false
  };
  
  constructor(
public modalCtrl: ModalController,
public equiposService:EquiposService,
public historialPartido:PartidoService,
public usuariosSerice:UsuariosService,
public jugadoresService:JugadoresService

  ) { }

  ngOnInit() {

    this.jugadoresService.syncJugadoresEquipos(this.equipo.Cod_Equipo == this.reto.retador.Cod_Equipo ?  this.reto.retador.Cod_Equipo : this.reto.rival.Cod_Equipo).then(jugadores =>{
console.log('jugadores', jugadores)
      this.jugadores = jugadores;
    })
    this.evaluacionJugador.Cod_Partido = this.partido.Cod_Partido;
console.log(this.partido,'patidooo')
    console.log(this.jugadores, 'this.jugadores',' this.evaluacionJugador', this.evaluacionJugador)

  }
  slidePrev() {

    this.slides.slidePrev();
  }
  slideNext() {
    
    this.slides.slideNext();
  }
  async  continuar(){

    const modal = await this.modalCtrl.create({
      component: EvaluacionEquipoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        equipo:this.equipo,
        partido:this.partido,
        reto:this.reto
      },
      id:'evaluacion-equipo'
    });

    await modal.present();
    let {data} = await modal.onDidDismiss();


 this.cerrarModal();

//this.slideNext();
  }

  cerrarModal(){
    this.modalCtrl.dismiss(null,null,'evaluacion-individual')
  }
  agregarJFP(value){
    console.log(value.detail,'agregarJFP');
    console.log(value.detail.value.Cod_Usuario,'agregarJFP');
    this.evaluacionJugador.Jugador_Futplay = value.detail.value.jugador.Cod_Usuario
    console.log('final eva', this.evaluacionJugador)
    this.evaluacionJugador.Cod_Partido = this.partido.Cod_Partido
    this.usuariosSerice.syncJugadorFutplay(this.evaluacionJugador.Jugador_Futplay).then(resp=>{
      this.usuariosSerice.syncJugadorDelPartido(this.evaluacionJugador.Jugador_Del_Partido).then(resp =>{
        this.continuar();
      });
 
    })

    
   // this.historialPartido.evaluacionJugador(this.evaluacionJugador);


  }
  agregarJDP(value){
    console.log(value.detail,'agregarJDP');
    this.evaluacionJugador.Jugador_Del_Partido = value.detail.value.jugador.Cod_Usuario
    this.slideNext();

  }

}