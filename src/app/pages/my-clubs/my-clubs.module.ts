import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyClubsPageRoutingModule } from './my-clubs-routing.module';

import { MyClubsPage } from './my-clubs.page';
import { FiltroPipe } from '../../pipes/filtro.pipe';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyClubsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MyClubsPage,FiltroPipe]
})
export class MyClubsPageModule {}
