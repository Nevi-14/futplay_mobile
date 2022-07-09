import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionHorarioPage } from './configuracion-horario.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionHorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionHorarioPageRoutingModule {}
