import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroUbicacionPage } from './filtro-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroUbicacionPageRoutingModule {}
