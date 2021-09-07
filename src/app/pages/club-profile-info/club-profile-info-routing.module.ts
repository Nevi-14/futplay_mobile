import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubProfileInfoPage } from './club-profile-info.page';

const routes: Routes = [
  {
    path: '',
    component: ClubProfileInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubProfileInfoPageRoutingModule {}
