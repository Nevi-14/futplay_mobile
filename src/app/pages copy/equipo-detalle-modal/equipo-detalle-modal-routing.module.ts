import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoDetalleModalPage } from './equipo-detalle-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EquipoDetalleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoDetalleModalPageRoutingModule {}
