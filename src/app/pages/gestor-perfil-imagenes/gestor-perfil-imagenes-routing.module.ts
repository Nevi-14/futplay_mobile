import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestorPerfilImagenesPage } from './gestor-perfil-imagenes.page';

const routes: Routes = [
  {
    path: '',
    component: GestorPerfilImagenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestorPerfilImagenesPageRoutingModule {}
