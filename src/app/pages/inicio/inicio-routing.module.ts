import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { RegistroPageModule } from '../registro/registro.module';
import { AutoLoginGuard } from 'src/app/guards/auto-login.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: '',
    component: InicioPage,
    children:[
      {
        path:'sobre-nosotros',
        loadChildren: () => import('../sobre-nosotros/sobre-nosotros.module').then( m => m.SobreNosotrosPageModule)
      },
      {
        path:'inicio-sesion',
        loadChildren: () => import('../inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule),
        canLoad:[AutoLoginGuard]
      },
      {
        path:'registro',
        loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
