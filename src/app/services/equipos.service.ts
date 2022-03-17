import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, PopoverController } from '@ionic/angular';
import { Equipos } from '../models/equipos';

import { ReservacionesService } from './reservaciones.service';
import { UsuariosService } from './usuarios.service';

import { environment } from 'src/environments/environment';
import { vistaEquipos } from '../models/vistaEquipos';
import { AlertasService } from './alertas.service';

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
  constructor(private http: HttpClient, private popOverCtrl: PopoverController, private userService: UsuariosService, private modalCtrl: ModalController , public retosService: ReservacionesService, public alertasService:AlertasService) { }

  getURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
   test = environment.TestURL;
    }
  const URL = environment.preURL  + test +  environment.postURL + api + id;
 
    return URL;
  }
   getEquipos(Cod_Usuario ){
    let URL = this.getURL( environment.equiposURL,'');
    URL = URL +environment.codUsuarioParam + Cod_Usuario
    console.log(URL,'URL')
    return this.http.get<vistaEquipos[]>( URL );
  }
  getMisEquipos( Cod_Usuario){
    let URL = this.getURL( environment.misEquiposURL,'');
    URL = URL +  environment.codUsuarioParam + Cod_Usuario
    console.log(URL,'URL')
    return this.http.get<vistaEquipos[]>( URL );
  }
  SyncMisEquipos(Cod_Usuario){

    this.alertasService.presentaLoading('Cargando lista de equipos')
   this.perfilEquipo = null;
   
    this.getMisEquipos(Cod_Usuario).subscribe(
      resp =>{
        this.misEquipos = [];
        this.misEquipos = resp;
this.alertasService.loadingDissmiss();
        this.perfilEquipo =  this.misEquipos[0]
console.log(this.perfilEquipo, 'perfil equipo', 'misqui', this.misEquipos[0])
        console.log('mis equipos', this.misEquipos)
       if(this.misEquipos.length  > 0){
         this.new = false
       }else{
         this.new = true;
       }
      }, error =>  {
        this.alertasService.loadingDissmiss();
      }
 
    );
  }


  private getCodEquipo( Cod_Equipo ){

    let URL = this.getURL( environment.perfilEquipoURL,'');
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
     URL = URL + environment.codEquipoParam + Cod_Equipo
    console.log(URL,'URL')
    return this.http.get<vistaEquipos[]>( URL );
  }

  SyncEquipos(Cod_Usuario){
    this.alertasService.presentaLoading('Cargando lista de rivales')
    this.getEquipos(Cod_Usuario).subscribe(
      resp =>{
        this.equipos = resp.slice(0);
        console.log('provinaisdkdkdk', this.equipos)

        this.alertasService.loadingDissmiss();
       
      }, error =>{
        this.alertasService.loadingDissmiss();
      }
 
    );
  }

   syncEquipo(Cod_Cancha){


    return this.getCodEquipo(Cod_Cancha).toPromise();

   }

   async syncEquipo2(Cod_Cancha){

    let equipo : vistaEquipos[];

     this.getCodEquipo(Cod_Cancha).subscribe(
       resp =>{

        equipo = resp.slice(0);
         console.log(equipo,'equipoequipo')
         return equipo
         
         
 
 
       }, error =>{

        equipo = null
         console.log(error)
         return equipo
       }

      
 
     );

     await equipo

   }





private equipoPost(equipo){


  const URL = this.getURL(environment.equiposURL,'');

  const options   = {
    headers: {
      'Content-type':'application/json',
      'Accept':'application/json',
      'Acess-Control-Allow-Origin':'*'
    }
  };


  return this.http.post(URL,JSON.stringify(equipo), options);


}


nuevoEquipo(equipo){
  console.log(equipo, 'stored 1')

  this.equipoPost(equipo).subscribe(
    resp =>{

      console.log(equipo, 'stored')


      this.SyncMisEquipos(equipo.Cod_Usuario)
      this.modalCtrl.dismiss();

    }, error =>{

    }
  )
}









  








}
