import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SolicitudesJugadoresPage } from './solicitudes-jugadores.page';
 
const routes: Routes = [
  {
    path: '',
    component: SolicitudesJugadoresPage,
    children: [
      {
        path: '',
        redirectTo: 'recibidas',
        pathMatch: 'full',
      },
      {
        path: 'recibidas',
        loadChildren: () => import('../solicitudes-recibidas-equipos/solicitudes-recibidas-equipos.module').then((m) => m.SolicitudesRecibidasEquiposPageModule),
      },
      {
        path: 'enviadas',
        loadChildren: () => import('../solicitudes-enviadas-equipos/solicitudes-enviadas-equipos.module').then((m) => m.SolicitudesEnviadasEquiposPageModule),
      },
   
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})


export class SolicitudesJugadoresPageRoutingModule {}
