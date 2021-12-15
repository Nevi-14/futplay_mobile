import { Pipe, PipeTransform } from '@angular/core';
import { Posiciones } from '../models/posiciones';
import { PosicionesService } from '../services/posiciones.service';


@Pipe({
  name: 'posiciones'
})
export class PosicionesPipe implements PipeTransform {
  constructor(public posiciones: PosicionesService) { }

  transform(value: any): any {
    let posiciones: Posiciones[] = [];

    posiciones = this.posiciones.posiciones;
    const posicion = posiciones.find( d => d.posicionID === value );
    if ( posicion !== undefined){
      return posicion.nombre;
    } else {
      return 'ND';
    }
  }

}
