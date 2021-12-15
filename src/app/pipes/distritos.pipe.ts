import { Pipe, PipeTransform } from '@angular/core';
import {  Distritos } from '../models/distritos';
import { DistritosService } from '../services/distritos.service';

@Pipe({
  name: 'distritos'
})
export class DistritosPipe implements PipeTransform {

  constructor(public distrito: DistritosService) { }

  transform(value: any): any {
    let distritos: Distritos[] = [];

    distritos = this.distrito.distritos;
    const distrito = distritos.find( d => d.distritoID === value );
    if ( distrito !== undefined){
      return distrito.nombre;
    } else {
      return 'Sin Especificar';
    }
  }

}
