import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetosEnviadosPage } from './retos-enviados.page';

const routes: Routes = [
  {
    path: '',
    component: RetosEnviadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetosEnviadosPageRoutingModule {}
