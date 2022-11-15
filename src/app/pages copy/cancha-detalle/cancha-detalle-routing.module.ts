import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanchaDetallePage } from './cancha-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CanchaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanchaDetallePageRoutingModule {}
