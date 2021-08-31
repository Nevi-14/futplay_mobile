import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RivalesPage } from './rivales.page';

const routes: Routes = [
  {
    path: '',
    component: RivalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RivalesPageRoutingModule {}
