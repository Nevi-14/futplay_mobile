import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarEquipoPage } from './eliminar-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarEquipoPageRoutingModule {}
