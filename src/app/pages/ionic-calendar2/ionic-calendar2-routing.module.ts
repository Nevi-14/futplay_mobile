import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicCalendar2Page } from './ionic-calendar2.page';

const routes: Routes = [
  {
    path: '',
    component: IonicCalendar2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IonicCalendar2PageRoutingModule {}
