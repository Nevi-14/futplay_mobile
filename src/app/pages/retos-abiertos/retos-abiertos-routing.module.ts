import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetosAbiertosPage } from './retos-abiertos.page';

const routes: Routes = [
  {
    path: '',
    component: RetosAbiertosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetosAbiertosPageRoutingModule {}
