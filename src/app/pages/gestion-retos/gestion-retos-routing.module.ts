import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionRetosPage } from './gestion-retos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionRetosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRetosPageRoutingModule {}
