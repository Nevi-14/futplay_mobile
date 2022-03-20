import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesEquiposPage } from './solicitudes-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesEquiposPageRoutingModule {}
