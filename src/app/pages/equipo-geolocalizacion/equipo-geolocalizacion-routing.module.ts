import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoGeolocalizacionPage } from './equipo-geolocalizacion.page';

const routes: Routes = [
  {
    path: '',
    component: EquipoGeolocalizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoGeolocalizacionPageRoutingModule {}
