import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'usuarios'
})
export class UsuariosPipe implements PipeTransform {
  constructor(public user: UserService) { }

  transform(texto: string = '',
  columna: string): any {
    let usuarios: Usuario[] = [];
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
