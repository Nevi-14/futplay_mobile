import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferenciasPage } from './transferencias.page';

const routes: Routes = [
  {
    path: '',
    component: TransferenciasPage,
    children: [
      {
        path: '',
        redirectTo: 'recibidas',
        pathMatch: 'full',
      },
      {
        path: 'recibidas',
        loadChildren: () => import('../solicitudes-recibidas-jugadores/solicitudes-recibidas-jugadores.module').then((m) => m.SolicitudesRecibidasJugadoresPageModule),
      },
      {
        path: 'enviadas',
        loadChildren: () => import('../solicitudes-enviadas-jugadores/solicitudes-enviadas-jugadores.module').then((m) => m.SolicitudesEnviadasJugadoresPageModule),
      },
   
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferenciasPageRoutingModule {}
