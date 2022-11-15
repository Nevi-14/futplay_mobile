import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { partidos } from 'src/app/models/partidos';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';

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
    public modalCtrl:ModalController



  ) { }

  ngOnInit() {

 if(this.usuariosService.usuarioActual.usuario.Cod_Usuario == this.reto.usuario_retador.Cod_Usuario){
this.retador = true;
 }else{
  this.retador = false;

 }

 alert(  this.retador)
      }



      verificarPuntos(){


      }

 evaluacionIndividual(){

 }
    


sumarMarcador(){
if(this.retador){
  this.partido[0].Goles_Retador += 1;
}else{
  this.partido[1].Goles_Retador += 1;
}

}

restarMarcador(){
if(this.retador){
  this.partido[0].Goles_Retador -= 1;
  if(this.partido[0].Goles_Retador <= 0){
    return this.partido[0].Goles_Retador =0; 
  }
}else{
  this.partido[1].Goles_Retador -= 1;
  if(this.partido[1].Goles_Retador <= 0){
    return this.partido[1].Goles_Retador =0; 
  }
}

}

cerrarModal(){

this.modalCtrl.dismiss();
}
}