import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinClubPage } from './join-club.page';

const routes: Routes = [
  {
    path: '',
    component: JoinClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinClubPageRoutingModule {}
