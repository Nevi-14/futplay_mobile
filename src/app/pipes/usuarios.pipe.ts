import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'usuarios'
})
export class UsuariosPipe implements PipeTransform {
  constructor(private user: UserService) { }

  transform(value: any): any {
    let usuarios: Usuario[] = [];
let user = 'usuarioID';

    usuarios = this.user.user;
    const usuario = usuarios.find( d => d[user] === value );
    if ( usuario !== undefined){
      return usuario.nombre +' ' + usuario.apellido1;
    } else {
      return 'ND';
    }
  }
}
