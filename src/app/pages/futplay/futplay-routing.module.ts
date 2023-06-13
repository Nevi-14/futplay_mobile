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
        path: '',
        pathMatch: 'full',
        redirectTo: 'mis-reservaciones',
      },
      {
        path:'mis-reservaciones',
        loadChildren: () => import('../mis-reservaciones/mis-reservaciones.module').then( m => m.MisReservacionesPageModule)
      },
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
        path:'mis-equipos',
        loadChildren: () => import('../mis-equipos/mis-equipos.module').then( m => m.MisEquiposPageModule)
      },
      {
        path:'torneos',
        loadChildren: () => import('../torneos/torneos.module').then( m => m.TorneosPageModule)
      },
      {
        path:'crear-unirse-equipo',
        loadChildren: () => import('../crear-unirse-equipo/crear-unirse-equipo.module').then( m => m.CrearUnirseEquipoPageModule)
      },
       
      {
        path:'notificaciones',
        loadChildren: () => import('../notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FutplayPageRoutingModule {}
