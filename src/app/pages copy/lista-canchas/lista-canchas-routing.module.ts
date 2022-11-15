import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCanchasPage } from './lista-canchas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCanchasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCanchasPageRoutingModule {}
