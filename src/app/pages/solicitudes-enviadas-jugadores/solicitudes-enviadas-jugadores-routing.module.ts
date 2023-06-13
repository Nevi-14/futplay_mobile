import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesEnviadasJugadoresPage } from './solicitudes-enviadas-jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesEnviadasJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesEnviadasJugadoresPageRoutingModule {}
