import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionRetosPage } from './gestion-retos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionRetosPage,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'retos-recibidos',
      },
      {
        path:'retos-enviados',
        loadChildren: () => import('../retos-enviados/retos-enviados.module').then( m => m.RetosEnviadosPageModule)
      },
      
      {
        path:'retos-recibidos',
        loadChildren: () => import('../retos-recibidos/retos-recibidos.module').then( m => m.RetosRecibidosPageModule)
      },
      {
        path:'retos-confirmados',
        loadChildren: () => import('../retos-confirmados/retos-confirmados.module').then( m => m.RetosConfirmadosPageModule)
      },
      {
        path:'historial-retos',
        loadChildren: () => import('../historial-retos/historial-retos.module').then( m => m.HistorialRetosPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRetosPageRoutingModule {}
