import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarReservacionPage } from './finalizar-reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarReservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarReservacionPageRoutingModule {}
