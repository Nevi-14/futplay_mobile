import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoReservacionPage } from './equipo-reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: EquipoReservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoReservacionPageRoutingModule {}
