import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarPagePage } from './calendar-page.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPagePageRoutingModule {}
