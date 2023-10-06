import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactarDesarolladorPage } from './contactar-desarollador.page';

const routes: Routes = [
  {
    path: '',
    component: ContactarDesarolladorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactarDesarolladorPageRoutingModule {}
