import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/search/rivales',
    pathMatch: 'full',
  }, {
    path: '',
    component: SearchPage,
    children:[
      {
        path:'rivales',
        loadChildren: () => import('../rivales/rivales.module').then( m => m.RivalesPageModule)
      },
      {
        path:'clasificacion',
        loadChildren: () => import('../clasificacion/clasificacion.module').then( m => m.ClasificacionPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
