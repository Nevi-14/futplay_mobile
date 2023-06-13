import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialRetosPage } from './historial-retos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialRetosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialRetosPageRoutingModule {}
