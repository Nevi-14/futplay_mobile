import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstLoginClubPage } from './first-login-club.page';

const routes: Routes = [
  {
    path: '',
    component: FirstLoginClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstLoginClubPageRoutingModule {}
