import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { JugadoresPipe } from './jugadores.pipe';
import { UsuariosPipe } from './usuarios.pipe';
import { DistritosPipe } from './distritos.pipe';
import { CantonesPipe } from './cantones.pipe';
import { ProvinciasPipe } from './provincias.pipe';
import { RolesPipe } from './roles.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    JugadoresPipe,
    UsuariosPipe,
    DistritosPipe,
    CantonesPipe,
    ProvinciasPipe,
    RolesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
