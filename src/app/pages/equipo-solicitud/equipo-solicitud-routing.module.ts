import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoSolicitudPage } from './equipo-solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: EquipoSolicitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoSolicitudPageRoutingModule {}
