import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FutplayPageRoutingModule } from './futplay-routing.module';

import { FutplayPage } from './futplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FutplayPageRoutingModule
  ],
  declarations: [FutplayPage]
})
export class FutplayPageModule {}
