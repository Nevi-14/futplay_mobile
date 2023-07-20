import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudesJugadoresPage } from './solicitudes-jugadores.page';
 

const routes: Routes = [
  {
    path: '',
    component: SolicitudesJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesJugadoresPageRoutingModule {}
