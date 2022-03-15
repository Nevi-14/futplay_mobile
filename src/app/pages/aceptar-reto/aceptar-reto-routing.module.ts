import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceptarRetoPage } from './aceptar-reto.page';

const routes: Routes = [
  {
    path: '',
    component: AceptarRetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceptarRetoPageRoutingModule {}
