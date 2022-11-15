import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { partidos } from 'src/app/models/partidos';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { PartidoService } from 'src/app/services/partido.service';
import { EvaluacionJugadorPage } from '../evaluacion-jugador/evaluacion-jugador.page';

@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  @Input() reto: PerfilReservaciones
  @Input() partido: partidos[]
  retador:boolean;
  constructor(
    public usuariosService:UsuariosService,
    public modalCtrl:ModalController,
    public partidosService:PartidoService


  ) { }

  ngOnInit() {

 if(this.usuariosService.usuarioActual.usuario.Cod_Usuario == this.reto.usuario_retador.Cod_Usuario){
this.retador = true;
 }else{
  this.retador = false;

 }
 
      }



      finalizarPartido(){

        if(this.retador){
          this.partido[0].Evaluacion = true;
        }else{
          this.partido[1].Evaluacion = true;

        }
        this.partidosService.syncPutPartido(this.retador ? this.partido[0] : this.partido[1]).then((resp:any) =>{
          this.partido = resp.partido
              console.log(resp)
            })
          }

      

 async evaluacionIndividual(){
  this.modalCtrl.dismiss();
    
    const modal = await this.modalCtrl.create({
      component:EvaluacionJugadorPage,
      cssClass:'my-custom-class',
      componentProps:{
        jugadores:[],
        equipo: this.retador ? this.reto.retador : this.reto.rival,
        partido:  this.retador ? this.partido[0] : this.partido[1]
      }

    })

    return await modal.present()
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
  if(this.partido[0].Goles_Rival <= 0){
    return this.partido[0].Goles_Rival =0; 
  }
 }else{
  this.partido[1].Goles_Rival -= 1;
  if(this.partido[1].Goles_Rival <= 0){
     this.partido[1].Goles_Rival =0; 

    this.actualizarMarcador();
    return
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
  if(this.partido[0].Goles_Retador <= 0){
     this.partido[0].Goles_Retador =0; 
    this.actualizarMarcador();
    return
  }
}else{
  this.partido[1].Goles_Retador -= 1;
  if(this.partido[1].Goles_Retador <= 0){
     this.partido[1].Goles_Retador =0; 
    this.actualizarMarcador();
    return
  }
}

}

cerrarModal(){

this.modalCtrl.dismiss();
}

actualizarMarcador(){
  this.partidosService.syncPutPartido(this.retador ? this.partido[0] : this.partido[1]).then((resp:any) =>{
this.partido = resp.partido
    console.log(resp)
  })
}
}