import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubInfoPage } from './club-info.page';

const routes: Routes = [
  {
    path: '',
    component: ClubInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubInfoPageRoutingModule {}
