import { Pipe, PipeTransform } from '@angular/core';
import { Provincia } from '../models/provincia';
import { ProvinciasService } from '../services/provincias.service';

@Pipe({
  name: 'provincias'
})
export class ProvinciasPipe implements PipeTransform {
  constructor(public provincias: ProvinciasService) { }

  transform(value: any): any {
    let provincias: Provincia[] = [];

    provincias = this.provincias.provincias;
    const provincia = provincias.find( d => d.provinciaID === value );
    if ( provincia !== undefined){
      return provincia.nombre;
    } else {
      return 'ND';
    }
  }

}
