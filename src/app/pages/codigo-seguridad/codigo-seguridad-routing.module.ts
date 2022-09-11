import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoSeguridadPage } from './codigo-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoSeguridadPageRoutingModule {}
