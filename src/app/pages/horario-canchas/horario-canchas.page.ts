import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-horario-canchas',
  templateUrl: './horario-canchas.page.html',
  styleUrls: ['./horario-canchas.page.scss'],
})
export class HorarioCanchasPage implements OnInit {
@Input() totalHoras:any[]
  horas = [];
  constructor(
    public modalCtrl:ModalController


  ) { }

  ngOnInit() {
  }
  agregarHora($event){
    let hora = $event.detail.value;
    console.log('hora',  hora)
    console.log('$event',  $event)
    let date = new Date()
    let fecha = this.addHours(date,hora+1)
    this.modalCtrl.dismiss(fecha)
    return
    let i = this.horas.findIndex( e => e == hora);
    if(i < 0 ){
      this.horas.push(hora)
    }else{
      this.horas.splice(i, 1)
    }
    this.horas.sort(function(a, b){return a - b});
    console.log('horas', this.horas)

  }
  addHours(date, hours) {
    date.setHours( hours);
    date.setMinutes(0);
    date.setMilliseconds(0);
    return date;
  }
 
  retornarHorario(){
  let horario = [];
  this.horas.forEach( (hora, index) =>{
    let date = new Date()
    let fecha = this.addHours(date,hora+1)
    console.log(index, this.horas.length, 'this.horas.length')
    horario.push(fecha)
    if(index == this.horas.length -1){
 
      this.modalCtrl.dismiss(horario)
    }
  })
}

}
