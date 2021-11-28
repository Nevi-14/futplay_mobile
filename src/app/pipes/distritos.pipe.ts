import { Pipe, PipeTransform } from '@angular/core';
import { Distrito } from '../models/distrito';
import { DistritosService } from '../services/distritos.service';

@Pipe({
  name: 'distritos'
})
export class DistritosPipe implements PipeTransform {

  constructor(public distrito: DistritosService) { }

  transform(value: any): any {
    let distritos: Distrito[] = [];

    distritos = this.distrito.distritos;
    const distrito = distritos.find( d => d.distritoID === value );
    if ( distrito !== undefined){
      return distrito.nombre;
    } else {
      return 'Sin Especificar';
    }
  }

}
