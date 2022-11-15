import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroJugadorPage } from './filtro-jugador.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroJugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroJugadorPageRoutingModule {}
