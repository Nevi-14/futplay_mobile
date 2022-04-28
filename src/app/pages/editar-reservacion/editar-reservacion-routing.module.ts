import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarReservacionPage } from './editar-reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: EditarReservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarReservacionPageRoutingModule {}
