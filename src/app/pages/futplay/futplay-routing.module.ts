import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FutplayPage } from './futplay.page';
import { AnunciosPageModule } from '../anuncios/anuncios.module';

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
      },
      {
        path:'mis-reservaciones',
        loadChildren: () => import('../mis-reservaciones/mis-reservaciones.module').then( m => m.MisReservacionesPageModule)
      },   {
        path:'mis-equipos',
        loadChildren: () => import('../mis-equipos/mis-equipos.module').then( m => m.MisEquiposPageModule)
      },
      {
        path:'anuncios',
        loadChildren: () => import('../anuncios/anuncios.module').then( m => m.AnunciosPageModule)
      },
      {
        path:'configuraciones',
        loadChildren: () => import('../configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FutplayPageRoutingModule {}
