import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { partidos } from 'src/app/models/partidos';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PartidoService } from 'src/app/services/partido.service';
import { EvaluacionJugadorPage } from '../evaluacion-jugador/evaluacion-jugador.page';
import { AlertasService } from '../../services/alertas.service';
import { CanchasService } from '../../services/canchas.service';
import { StorageService } from '../../services/storage-service';
import { VideoScreenPage } from '../video-screen/video-screen.page';
import { JugadoresService } from '../../services/jugadores.service';
import { PerfilJugador } from 'src/app/models/perfilJugador';
@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  @Input() reto: PerfilReservaciones
  @Input() partido: partidos[]
  retador:boolean=null;
  rival:boolean=null;
  jugadoresPermitidosRetador:PerfilJugador[]=[]
  jugadoresPermitidosRival:PerfilJugador[]=[]
  constructor(
    public usuarioService:UsuariosService,
    public modalCtrl:ModalController,
    public partidosService:PartidoService,
    public alertasService:AlertasService,
    public alertCtrl:AlertController,
    public canchasService:CanchasService,
    public storageService:StorageService,
    public jugadoresService: JugadoresService
  


  ) { }

  funcionRetador(){
    this.retador = true;
    
  }

  funcionRival(){
    this.rival = true;
  }



  async ngOnInit() {

    console.log('partooo', this.partido)

    this.alertasService.presentaLoading('Cargando datos..')
    this.jugadoresPermitidosRetador = await this.jugadoresService.syncJugadoresEquipos(this.reto.retador.Cod_Equipo);
    this.jugadoresPermitidosRival = await this.jugadoresService.syncJugadoresEquipos(this.reto.rival.Cod_Equipo);
    let indexRetador = this.jugadoresPermitidosRetador.findIndex(user =>  user.usuario.Cod_Usuario == this.usuarioService.usuarioActual.Cod_Usuario);
    let indexRival = this.jugadoresPermitidosRival.findIndex(user =>  user.usuario.Cod_Usuario == this.usuarioService.usuarioActual.Cod_Usuario);
    let stringID = this.reto.reservacion.Cod_Reservacion + "-" + this.usuarioService.usuarioActual.Cod_Usuario+ "-" +this.reto.reservacion.Fecha


    if(indexRetador >=0 && indexRival >=0){
      if(this.jugadoresPermitidosRetador[0].usuario.Cod_Usuario == this.usuarioService.usuarioActual.Cod_Usuario){
        this.funcionRetador();
      }else{
        this.funcionRival();
      }
  
    }else if(indexRetador >=0 &&  indexRival < 0){
  
  this.funcionRetador();
    }else if (indexRival >=0  &&  indexRetador < 0){
  
   this.funcionRival();
    } 
    this.alertasService.loadingDissmiss();
    this.storageService.get(stringID).then(codigo =>{

      if(this.partido[0].Estado && this.partido[1].Estado && !codigo){

      this.storageService.set(stringID,this.reto.reservacion.Cod_Reservacion);
      
      // Show Video
    //  this.videoScreen(5);
      }

    })
 
  
 
      }


      async empate() {

         
        const alert = await this.alertCtrl.create({
          header: 'FUTPLAY!',
          subHeader:'El marcador del partido es 0. ¿Esta seguro que desea continuar? No podras revertir el proceso..',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
              
              },
            },
            {
              text: 'Si, continuar',
              role: 'confirm',
              handler: () => {

                this.partidosService.syncPutFinalizarPartido(this.retador ? this.partido[0] : this.partido[1]).then((resp:any) =>{

                  this.partido = resp.partido
                  this.regresar();
                this.evaluacionModal();
                    })
              },
            },
          ],
        });
    
        await alert.present();
    
        const { role } = await alert.onDidDismiss();
       ;
      }
      async continuarEvaluacion() {
 
        const alert = await this.alertCtrl.create({
          header: 'FUTPLAY!',
          subHeader:'¿Esta seguro que desea continuar? No podras revertir el proceso..',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
              
              },
            },
            {
              text: 'Si, continuar',
              role: 'confirm',
              handler: () => {
           
                this.partidosService.syncPutFinalizarPartido(this.retador ? this.partido[0] : this.partido[1]).then((resp:any) =>{

                  this.partido = resp.partido
                  this.regresar();
                  this.evaluacionModal();

                    })
              },
            },
          ],
        });
    
        await alert.present();
    
        const { role } = await alert.onDidDismiss();
       ;
      }

      async continuar() {
        const alert = await this.alertCtrl.create({
          header: 'FUTPLAY!',
          subHeader:'¿Esta seguro que desea continuar? No podras revertir el proceso..',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              
              },
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
              //  this.evaluacionModal();
            //    return
                this.partidosService.syncPutFinalizarPartido(this.retador ? this.partido[0] : this.partido[1]).then((resp:any) =>{

                  this.partido = resp.partido
                  this.regresar();
                  this.evaluacionModal();
    
                    })
              },
            },
          ],
        });
    
        await alert.present();
    
        const { role } = await alert.onDidDismiss();
       ;
      }
      async  finalizarPartido(){
      
 
    
    
    this.continuar();


     
        
          }

          varificarMarcador(){


          return   this.partidosService.syncGetPartidoReservacion(this.partido[0].Cod_Reservacion).then(partido =>{
              this.partido = partido;
          
        
              
              
              
                      })
  
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
        

 async evaluacionIndividual(){
 
  await this.varificarMarcador();
 
  if(this.partido[0].Goles_Retador == 0 &&  this.partido[1].Goles_Retador == 0  && this.partido[0].Goles_Rival == 0 && this.partido[1].Goles_Rival == 0 ){
        
    this.empate();


    return
  }



if(this.partido[0].Goles_Retador != this.partido[1].Goles_Retador  || this.partido[0].Goles_Rival != this.partido[1].Goles_Rival){

this.alertasService.message('FUTPLAY','Lo sentimos ambos marcadores deben de coincidir para poder continuar, indicar al otro equipo que actualice el marcador.');

return
}

this.partidosService.syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion).then(resp =>{
  if(!resp[0].Estado && !resp[1].Estado){
    this.alertasService.message('FUTPLAY','Lo sentimos el partido ya fue finalizado!.');
  }else{
    this.continuar();
  }


}, error =>{
  this.alertasService.message('FUTPLAY','Lo sentimos algo salio mal!.');
})


 

 }



async  evaluacionModal(){


  const modal = await this.modalCtrl.create({
    component:EvaluacionJugadorPage,
    cssClass:'my-custom-class',
    componentProps:{
      jugadores:[],
      equipo: this.retador ? this.reto.retador : this.reto.rival,
      partido:  this.retador ? this.partido[0] : this.partido[1],
      reto:this.reto
    },

    id:'evaluacion-individual'

  })

  await modal.present();
  let {data} = await modal.onDidDismiss();

 //this.cerrarModal();
 }
    
sumarMarcadorRival(){

if(this.retador){
  this.partido[0].Goles_Rival += 1;
  this.actualizarMarcador();
  return

}else{
  this.partido[1].Goles_Rival += 1;

  this.actualizarMarcador();
  return
}
}
  
restarMarcadorRival(){

 if(this.retador){


  this.partido[0].Goles_Rival -= 1;
  if(this.partido[0].Goles_Rival >= 0){


    this.actualizarMarcador();
    return 
  }

  if(this.partido[0].Goles_Rival  < 0 ){

    this.partido[0].Goles_Rival  = 0;
  
   }
 }else{
 
  this.partido[1].Goles_Rival -= 1;
  if(this.partido[1].Goles_Rival >= 0){
   

    this.actualizarMarcador();
    return
  }
  if(this.partido[1].Goles_Rival  < 0 ){

    this.partido[1].Goles_Rival  = 0;
    
   }
 }
}

sumarMarcadorRetador(){

 if(this.retador){
  this.partido[0].Goles_Retador += 1;
  this.actualizarMarcador();
  return
 }else{
  this.partido[1].Goles_Retador += 1;
  this.actualizarMarcador();
  return
 }

}

restarMarcadorRetador(){

if(this.retador){
  this.partido[0].Goles_Retador -= 1;
  if(this.partido[0].Goles_Retador >= 0){
  
    this.actualizarMarcador();
 
    return
  }
  if(this.partido[0].Goles_Retador  < 0 ){

    this.partido[0].Goles_Retador  = 0;
    
   }
}else{
  this.partido[1].Goles_Retador -= 1;
  if(this.partido[1].Goles_Retador >= 0){
    
    this.actualizarMarcador();

    return
  }
  if(this.partido[1].Goles_Retador  < 0 ){

    this.partido[1].Goles_Retador  = 0;
    
   }
}

}

regresar(){

  this.modalCtrl.dismiss(null,null,'inicio-partido')
}

actualizarMarcador(){





  this.partidosService.syncPutPartido(this.retador ? this.partido[0] : this.partido[1]).then((resp:any) =>{
    this.partidosService.syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion).then(partido =>{
      this.partido = partido;

    console.log(resp)
  }, error =>{
    this.alertasService.message('FUTPLAY', resp.message)
  })
})
}
}