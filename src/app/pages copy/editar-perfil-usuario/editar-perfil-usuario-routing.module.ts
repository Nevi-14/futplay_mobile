import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilUsuarioPage } from './editar-perfil-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilUsuarioPageRoutingModule {}
