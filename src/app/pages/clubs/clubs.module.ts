import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubsPageRoutingModule } from './clubs-routing.module';

import { ClubsPage } from './clubs.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClubsPage]
})
export class ClubsPageModule {}
