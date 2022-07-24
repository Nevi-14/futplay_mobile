import { Component, OnInit, Input } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos.service';
import { ModalController } from '@ionic/angular';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { JugadoresEquipos } from 'src/app/models/jugadoresEquipos';


@Component({
  selector: 'app-estadistica-equipo',
  templateUrl: './estadistica-equipo.page.html',
  styleUrls: ['./estadistica-equipo.page.scss'],
})
export class EstadisticaEquipoPage implements OnInit {
@Input() equipo: vistaEquipos
estatura = 0;
peso = 0;
  constructor(
    public modalCtrl:ModalController,
public equiposService: EquiposService,

  ) { }

  ngOnInit() {
console.log('equipo', this.equipo)
this.equiposService.SyncJugadoresEquipos(this.equipo.Cod_Equipo).then(jugadores =>{

  for (let i = 0 ; i < jugadores.length; i++){
    this.peso  += jugadores[i].Peso;
    this.estatura  +=  jugadores[i].Estatura;

    if(i == jugadores.length -1){
    

        this.peso = this.peso / jugadores.length
  this.estatura =  this.estatura  / jugadores.length;
    }
  }


});
  }
  
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  moda(array:JugadoresEquipos[], column){
    let moda=0;
    let Rep=0;
  
    for(let i=0;i<array.length-1;i++) {
      let cantRep=0;
     for(let j=0;j<array.length-1;i++) {
  
       if(array[i][column]==array[j][column])
  
       cantRep++;
  
       if(cantRep>Rep) moda=array[i][column];
       Rep=cantRep;
  
     }
    }
  
    return moda;
  }

}
