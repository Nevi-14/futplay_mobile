import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetosRecibidosPage } from './retos-recibidos.page';

const routes: Routes = [
  {
    path: '',
    component: RetosRecibidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetosRecibidosPageRoutingModule {}
