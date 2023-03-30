import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EfectuarPagoPage } from './efectuar-pago.page';

const routes: Routes = [
  {
    path: '',
    component: EfectuarPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EfectuarPagoPageRoutingModule {}
