import { Pipe, PipeTransform } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { UsuariosService } from '../services/usuarios.service';

@Pipe({
  name: 'usuarios'
})
export class UsuariosPipe implements PipeTransform {
  constructor(public user: UsuariosService) { }

  transform(texto: any = '',
  columna: any): any {
    let usuarios: Usuarios[] = [];
let user = 'usuarioID';
console.log('columna',columna)
    usuarios = this.user.user;
    const usuario = usuarios.find( d => d[user] === texto );
    if ( usuario !== undefined){
      return usuario[columna];
    } else {
      return 'ND';
    }
  }
}
