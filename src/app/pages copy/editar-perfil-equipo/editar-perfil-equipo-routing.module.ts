import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilEquipoPage } from './editar-perfil-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilEquipoPageRoutingModule {}
