import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarRetoPage } from './eliminar-reto.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarRetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarRetoPageRoutingModule {}
