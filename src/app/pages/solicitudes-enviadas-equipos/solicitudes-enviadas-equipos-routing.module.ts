import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesEnviadasEquiposPage } from './solicitudes-enviadas-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesEnviadasEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesEnviadasEquiposPageRoutingModule {}
