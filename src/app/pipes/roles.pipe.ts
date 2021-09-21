import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../models/role';
import { RolesService } from '../services/roles.service';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  constructor(private roles: RolesService) { }

  transform(value: any): any {
    let roles: Role[] = [];

    roles = this.roles.roles;
    const role = roles.find( d => d.roleID === value );
    if ( role !== undefined){
      return role.nombre;
    } else {
      return 'ND';
    }
  }
}
