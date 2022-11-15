import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FutplayPage } from './futplay.page';

const routes: Routes = [

  {
    path: '',
    component: FutplayPage,
    children:[
      {
        path:'mi-perfil',
        loadChildren: () => import('../mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
      },
      {
        path:'perfil-equipo',
        loadChildren: () => import('../perfil-equipo/perfil-equipo.module').then( m => m.PerfilEquipoPageModule)
      },
      {
        path:'rivales',
        loadChildren: () => import('../rivales/rivales.module').then( m => m.RivalesPageModule)
      },
      {
        path:'canchas',
        loadChildren: () => import('../canchas/canchas.module').then( m => m.CanchasPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FutplayPageRoutingModule {}
