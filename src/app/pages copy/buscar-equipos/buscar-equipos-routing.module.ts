import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarEquiposPage } from './buscar-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarEquiposPageRoutingModule {}
