import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyClubsPageRoutingModule } from './my-clubs-routing.module';

import { MyClubsPage } from './my-clubs.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyClubsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MyClubsPage]
})
export class MyClubsPageModule {}
