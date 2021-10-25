import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubConfigPageRoutingModule } from './club-config-routing.module';

import { ClubConfigPage } from './club-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubConfigPageRoutingModule
  ],
  declarations: [ClubConfigPage]
})
export class ClubConfigPageModule {}
