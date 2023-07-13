import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaModalPage } from './busqueda-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaModalPageRoutingModule {}
