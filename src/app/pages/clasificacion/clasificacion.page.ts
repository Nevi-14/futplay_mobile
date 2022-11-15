import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.page.html',
  styleUrls: ['./clasificacion.page.scss'],
})
export class ClasificacionPage implements OnInit {

  constructor(
public equiposService:EquiposService
  ) { }

  ngOnInit() {

  
  }

}
