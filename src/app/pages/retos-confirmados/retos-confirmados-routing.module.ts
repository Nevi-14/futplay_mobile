import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetosConfirmadosPage } from './retos-confirmados.page';

const routes: Routes = [
  {
    path: '',
    component: RetosConfirmadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetosConfirmadosPageRoutingModule {}
