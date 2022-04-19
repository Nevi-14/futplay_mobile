import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroEquipoPage } from './filtro-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroEquipoPageRoutingModule {}
