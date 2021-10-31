import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferenciasPage } from './transferencias.page';
import { UsuariosPipe } from '../../pipes/usuarios.pipe';

const routes: Routes = [
  {
    path: '',
    component: TransferenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,UsuariosPipe],
})
export class TransferenciasPageRoutingModule {}
