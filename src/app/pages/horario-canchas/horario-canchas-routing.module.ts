import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioCanchasPage } from './horario-canchas.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioCanchasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioCanchasPageRoutingModule {}
