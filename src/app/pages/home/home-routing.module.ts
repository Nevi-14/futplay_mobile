import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [ 
  {
    path: '',
    redirectTo: '/home/profile',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path:'clubs',
        loadChildren: () => import('../clubs/clubs.module').then( m => m.ClubsPageModule)
      },
      {
        path:'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path:'reservations',
        loadChildren: () => import('../reservations/reservations.module').then( m => m.ReservationsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
