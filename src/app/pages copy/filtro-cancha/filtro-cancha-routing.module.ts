import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroCanchaPage } from './filtro-cancha.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroCanchaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroCanchaPageRoutingModule {}
