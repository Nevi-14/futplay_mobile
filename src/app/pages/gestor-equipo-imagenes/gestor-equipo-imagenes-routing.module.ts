import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestorEquipoImagenesPage } from './gestor-equipo-imagenes.page';

const routes: Routes = [
  {
    path: '',
    component: GestorEquipoImagenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestorEquipoImagenesPageRoutingModule {}
