import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubConfigPage } from './club-config.page';

const routes: Routes = [
  {
    path: '',
    component: ClubConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubConfigPageRoutingModule {}
