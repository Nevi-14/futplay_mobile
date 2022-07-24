import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, PopoverController } from '@ionic/angular';
import { Equipos } from '../models/equipos';

import { ReservacionesService } from './reservaciones.service';
import { UsuariosService } from './usuarios.service';

import { environment } from 'src/environments/environment';
import { vistaEquipos } from '../models/vistaEquipos';
import { AlertasService } from './alertas.service';
import { JugadoresEquipos } from '../models/jugadoresEquipos';
import { SolicitudesService } from './solicitudes.service';
import { GestorImagenesService } from 'src/app/services/gestor-imagenes.service';
import { vistaOtrosEquipos } from '../models/vistaOtrosEquipos';
import { Evaluacion } from '../models/evaluacion';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  new = false
  perfilEquipo: vistaEquipos = null;
  clubPlayer = false;
  clubAdmin = false;
  club: Equipos[] = [];
  equipos: vistaEquipos[] = [];
  userclubs: Equipos[] = [];
  playerClubs: Equipos[] = [];
  switchClub: Equipos;
  tieneEquipos = false;
  stadiumProfile = null;
  misEquipos: vistaEquipos[];
  otrosEquipos:vistaOtrosEquipos[];
jugadoresRival : JugadoresEquipos[]=[];
jugadoresRetador : JugadoresEquipos[]=[];
jugadoresPerfilEquipo : JugadoresEquipos[]=[];
  constructor(private http: HttpClient, private popOverCtrl: PopoverController, private userService: UsuariosService, private modalCtrl: ModalController , public retosService: ReservacionesService, public alertasService:AlertasService, public solicitudesService: SolicitudesService, public gestorImagenesService:GestorImagenesService) { }

  getURL( api: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
   test = environment.TestURL;
    }
  const URL = environment.preURL  + test +  environment.postURL + api 
 
    return URL;
  }
   getEquipos(Cod_Usuario ){
    let URL = this.getURL( environment.equiposURL);
    URL = URL +environment.codUsuarioParam + Cod_Usuario
    console.log(URL,'URL')
    return this.http.get<vistaEquipos[]>( URL );
  }
  getMisEquipos( Cod_Usuario){
    let URL = this.getURL( environment.misEquiposURL);
    URL = URL +  environment.codUsuarioParam + Cod_Usuario
    console.log(URL,'URL')
    return this.http.get<vistaEquipos[]>( URL );
  }
  getOtrosEquipos( Cod_Usuario){
    let URL = this.getURL( environment.otrosEquiposURL);
    URL = URL +  environment.codUsuarioParam + Cod_Usuario
    console.log(URL,'URL')
    return this.http.get<vistaOtrosEquipos[]>( URL );
  }
  SyncMisEquipos(Cod_Usuario){
   
   return  this.getMisEquipos(Cod_Usuario).toPromise();
  }
  SyncOtrosEquipos(Cod_Usuario){
   
    return  this.getOtrosEquipos(Cod_Usuario).toPromise();
   }

  private   putEquipo( equipo, Cod_Usuario ){
    let URL = this.getURL( environment.equiposURL);
         URL = URL + environment.codEquipoParam +equipo.Cod_Equipo + environment.codUsuarioSecondParam +Cod_Usuario;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, JSON.stringify(equipo), options );
  }

   actualizarEquipo(equipo, Cod_Usuario ){

    console.log('equipo', equipo)
    this.putEquipo( equipo, Cod_Usuario ).subscribe(
      resp => {

        this.alertasService.message('FUTPLAY', 'Equipo actualizado')
        this.syncEquipo(equipo.Cod_Equipo).then(resp =>{
console.log(resp,'resp')
          this.perfilEquipo = resp[0];
          console.log('this.perfilEquipothis.perfilEquipo', this.perfilEquipo)

        })
        console.log('pdated')
      }
   
    )
  }
  actualizarEquipoToPromise(equipo, Cod_Usuario ){

   return this.putEquipo( equipo, Cod_Usuario ).toPromise();
  }

  private getJugadoresEquipos(Cod_Equipo){

    let URL = this.getURL(environment.jugadoresEquiposURL);
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
     URL = URL + environment.codEquipoParam + Cod_Equipo
    console.log(URL,'URL')
    return this.http.get<JugadoresEquipos[]>( URL );


  }
  private evaluacionEquipos(Cod_Equipo){

    let URL = this.getURL(environment.evaluacionEquiposURL);
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    
    URL = URL + environment.codEquipoParam + Cod_Equipo
    console.log(URL,'URL')
    return this.http.get<Evaluacion[]>( URL );


  }
  syncEvaluacionEquipos(Cod_Equipo){

    return this.evaluacionEquipos(Cod_Equipo).toPromise();
    
      }
  private getEquiposPosicion(){

    let URL = this.getURL(environment.posicionActualURL);
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    console.log(URL,'URL')
    return this.http.get<Equipos[]>( URL );


  }


  syncGetEquiposPosicion(){

    return this.getEquiposPosicion().toPromise();
    
      }


  SyncJugadoresEquipos(Cod_Equipo){

return this.getJugadoresEquipos(Cod_Equipo).toPromise();

  }

  private getCodEquipo( Cod_Equipo ){

    let URL = this.getURL( environment.perfilEquipoURL);
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
     URL = URL + environment.codEquipoParam + Cod_Equipo
    console.log(URL,'URL')
    return this.http.get<vistaEquipos>( URL );
  }

  SyncEquipos(Cod_Usuario){
   // this.alertasService.presentaLoading('Cargando lista de rivales')
    return this.getEquipos(Cod_Usuario).toPromise();
  }

   syncEquipo(Cod_Equipo){


    return this.getCodEquipo(Cod_Equipo).toPromise();

   }






private equipoPost(equipo){


  const URL = this.getURL(environment.equiposURL);

  const options   = {
    headers: {
      'Content-type':'application/json',
      'Accept':'application/json',
      'Acess-Control-Allow-Origin':'*'
    }
  };


  return this.http.post(URL,JSON.stringify(equipo), options);


}
cerrarModal(){
  this.modalCtrl.dismiss();
}


nuevoEquipo(equipo:Equipos){
 return  this.equipoPost(equipo).toPromise();
}




private filtrarEquipos( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number){

  let URL = this.getURL( environment.fitrarEquipos);
 let params = environment.Cod_Provincia+ Cod_Provincia + environment.Cod_Canton_Param+ Cod_Canton +
              environment.Cod_Distrito_Param+ Cod_Distrito
  URL = URL+ params

  console.log(URL,'filtro Usuarios ')

  return this.http.get<vistaEquipos[]>( URL );
}

 syncfiltrarEquipos( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number){

this.filtrarEquipos(Cod_Provincia,Cod_Canton,Cod_Distrito).subscribe(

resp =>{
this.equipos = [];
  this.equipos = resp.slice(0);

  console.log(this.equipos,'equipos')


}

);
}




  








}
