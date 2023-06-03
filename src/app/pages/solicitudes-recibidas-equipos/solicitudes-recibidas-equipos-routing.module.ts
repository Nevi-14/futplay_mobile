import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesRecibidasEquiposPage } from './solicitudes-recibidas-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesRecibidasEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesRecibidasEquiposPageRoutingModule {}
