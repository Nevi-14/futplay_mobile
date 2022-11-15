import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioCachaPage } from './horario-cacha.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioCachaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioCachaPageRoutingModule {}
