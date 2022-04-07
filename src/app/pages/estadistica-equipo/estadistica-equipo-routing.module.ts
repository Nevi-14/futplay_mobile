import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticaEquipoPage } from './estadistica-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaEquipoPageRoutingModule {}
