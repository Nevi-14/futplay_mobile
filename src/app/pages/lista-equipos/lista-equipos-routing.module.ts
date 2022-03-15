import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEquiposPage } from './lista-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEquiposPageRoutingModule {}
