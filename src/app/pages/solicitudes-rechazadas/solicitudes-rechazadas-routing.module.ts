import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesRechazadasPage } from './solicitudes-rechazadas.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesRechazadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesRechazadasPageRoutingModule {}
