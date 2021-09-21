import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jugadores'
})
export class JugadoresPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
