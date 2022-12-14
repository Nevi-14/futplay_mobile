import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroUsuariosPage } from './filtro-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroUsuariosPageRoutingModule {}
