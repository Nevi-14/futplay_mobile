import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluacionEquipoPage } from './evaluacion-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluacionEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluacionEquipoPageRoutingModule {}
