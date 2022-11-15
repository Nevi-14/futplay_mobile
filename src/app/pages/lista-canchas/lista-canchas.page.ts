import { Component, OnInit } from '@angular/core';
import { CanchasService } from '../../services/canchas.service';

@Component({
  selector: 'app-lista-canchas',
  templateUrl: './lista-canchas.page.html',
  styleUrls: ['./lista-canchas.page.scss'],
})
export class ListaCanchasPage implements OnInit {
  semana = [
    { Code: 0, Day: 'Domingo' },
    { Code: 1, Day: 'Lunes' },
    { Code: 2, Day: 'Martes' },
    { Code: 3, Day: 'Miercoles' },
    { Code: 4, Day: 'Jueves' },
    { Code: 5, Day: 'Viernes' },
    { Code: 6, Day: 'Sabado' }]
    dia = null;
  constructor(
public canchasService : CanchasService

  ) { }

  ngOnInit() {
 
let dia = this.diaNombre(new Date().getDay);

    
  }

  diaNombre(index) {
    return this.semana[index].Day
  }
  cerrarModal(){

  }
  filtroUbicacion(){

  }

onOpenMenu(cancha){


  }
}
