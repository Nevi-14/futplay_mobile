import { Pipe, PipeTransform } from '@angular/core';
import { Cantones } from '../models/cantones';
import { CantonesService } from '../services/cantones.service';

@Pipe({
  name: 'cantones'
})
export class CantonesPipe implements PipeTransform {
  constructor(public cantones: CantonesService) { }

  transform(value: any): any {
    let cantones: Cantones[] = [];

    cantones = this.cantones.cantones;
    const canton = cantones.find( d => d.cantonID === value );
    if ( canton !== undefined){
      return canton.nombre;
    } else {
      return 'Sin Especificar';
    }
  }

}
