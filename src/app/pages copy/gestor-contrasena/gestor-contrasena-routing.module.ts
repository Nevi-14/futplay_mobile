import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestorContrasenaPage } from './gestor-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: GestorContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestorContrasenaPageRoutingModule {}
