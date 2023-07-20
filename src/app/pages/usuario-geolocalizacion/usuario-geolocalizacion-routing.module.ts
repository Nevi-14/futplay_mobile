import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioGeolocalizacionPage } from './usuario-geolocalizacion.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioGeolocalizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioGeolocalizacionPageRoutingModule {}
