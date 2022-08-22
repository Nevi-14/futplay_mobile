import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearUnirseEquipoPage } from './crear-unirse-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearUnirseEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearUnirseEquipoPageRoutingModule {}