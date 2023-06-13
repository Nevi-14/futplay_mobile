import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesRecibidasJugadoresPage } from './solicitudes-recibidas-jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesRecibidasJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesRecibidasJugadoresPageRoutingModule {}
