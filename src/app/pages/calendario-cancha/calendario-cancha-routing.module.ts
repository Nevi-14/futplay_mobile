import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioCanchaPage } from './calendario-cancha.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioCanchaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioCanchaPageRoutingModule {}
