import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { AlertasService } from '../../services/alertas.service';
import { Equipos } from '../../models/equipos';
import { partidos } from 'src/app/models/partidos';
import { PartidoService } from '../../services/partido.service';
import { HistorialPartidoEquipos } from '../../models/historialPartidoEquipo';
import { StorageService } from '../../services/storage-service';
import { UsuariosService } from '../../services/usuarios.service';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { VideoScreenPage } from '../video-screen/video-screen.page';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
 
@Component({
  selector: 'app-evaluacion-equipo',
  templateUrl: './evaluacion-equipo.page.html',
  styleUrls: ['./evaluacion-equipo.page.scss'],
})
export class EvaluacionEquipoPage implements OnInit {

  dureza = [

    {id:0,titulo:'Equipo Neutral',image:'equipo-neutral.svg'},
    {id:1,titulo:'Juego Molesto',image:'juego-molesto.svg'},
    {id:2,titulo:'Agresividad Irresponsable',image:'agresividad-irresponsable.svg'},
    {id:3,titulo:'Caracter Revelde',image:'caracter-revelde.svg'},
    {id:4,titulo:'Mas Que Un Club',image:'mas-que-un-club.svg'},
    {id:5,titulo:'Clase Mundia FairPlay',image:'clase-mundial-fairplay.svg'}
  
  ]
  indexD = 0;
  @Input() equipo:Equipos
  @Input() partido:partidos
  @Input() reto: PerfilReservaciones
evaluacionEquipo:HistorialPartidoEquipos = {
  Cod_Historial:null,
  Cod_Equipo: null,
  Dureza: null

}

stadiumProfile =  'assets/main/team-profile.svg';
  constructor(
    public historialPartidosService:PartidoService,
    public modalCtrl:ModalController,
    public equiposservice: EquiposService,
    public alertasService: AlertasService,
    public storageService:StorageService,
    public usuariosService: UsuariosService,
    public reservacionesService: ReservacionesService
  ) { }

  ngOnInit() {
  }
  
  durezaEquipo(value){
this.indexD = value.detail.value
   this.evaluacionEquipo.Cod_Equipo =  this.equipo.Cod_Equipo;
   this.evaluacionEquipo.Dureza = value.detail.value
   
console.log(this.evaluacionEquipo, 'evaluacion eqqq')
console.log(this.partido, 'evaluacion  partido eqqq')
this.finalizar();
   
  }

  regresar(){
    this.modalCtrl.dismiss();
  }
  finalizar(){

  /**
   *   this.modalCtrl.dismiss();
    this.videoScreen(6);
    return
   */

    this.equiposservice.syncPostDurezaEquipo(this.evaluacionEquipo).then(resp =>{
      let stringID = this.reto.reservacion.Cod_Reservacion + "-" + this.usuariosService.usuarioActual.Cod_Usuario+ "-" +this.reto.reservacion.Fecha
      this.reservacionesService.cargarReservaciones();
      this.modalCtrl.dismiss();
    /**
     * 
      this.storageService.delete(stringID).then(async (codigo) =>{

       // this.reservacionesService.segment = 0;
        this.reservacionesService.cargarReservaciones();
        this.modalCtrl.dismiss();
      
  
      })

     */

    })


/**
 *     this.historialPartidosService.evaluacionEquipo(this.evaluacionEquipo);
    this.partido.Evaluacion = true;
 */
    
/**
 *     this.equiposservice.syncEvaluacionEquipos(this.evaluacionEquipo.Cod_Equipo).then(evaluaciones =>{
this.equiposservice.syncEquipo(this.evaluacionEquipo.Cod_Equipo).then(equipo =>{

if(evaluaciones.length > 0 ){
  equipo[0].Dureza =  this.mode(evaluaciones, 'Dureza');
}else{
  equipo[0].Dureza =  this.dureza[this.indexD].id;
}


  console.log('equipo dureza',  equipo[0])
   this.equiposservice.actualizarEquipoToPromise( equipo[0],  equipo[0].Cod_Usuario).then(resp =>{
    console.log('equipo actualizado', resp)
    this.alertasService.message('FUTPLAY', 'FIN DEL PARTIDO')
   })
});
    });
 */

/**
 *     this.historialPartidosService.actualizarPartidotoPromise(this.partido, this.partido.Cod_Reservacion);
 */
   // this.googleAdsService.showRewardVideo();
    
  }
  async videoScreen(id){
    const modal = await this.modalCtrl.create({
      component:VideoScreenPage,
      cssClass:'modal-view',
      id:'video-screen-modal',
      mode:'ios',
      backdropDismiss:false,
      componentProps:{
        index:id
      }
    });
    return await modal.present();
    
      }
  mode(array, column)
{
 
  var mf = 1;
  var m = 0;
  var item;
  for (var i=0; i<array.length; i++)
  { console.log('i',  array[i][column])
          for (var j=i; j<array.length; j++)
          {
            console.log('j',  array[j][column])


                  if (array[i][column] === array[j][column])
                   m++;
                   console.log('m',  m, 'mf', mf)
                  if (mf<m)
                  {
                    mf=m; 

                    console.log('end',  array[i][column])
                  return  item = array[i][column];
                  }else if (mf == m){
                    return  item = array[array.length -1][column];
                  }
          }
          m=0;
  }
}
}