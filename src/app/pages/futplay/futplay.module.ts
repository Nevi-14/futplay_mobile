import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FutplayPageRoutingModule } from './futplay-routing.module';

import { FutplayPage } from './futplay.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FutplayPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [FutplayPage]
})
export class FutplayPageModule {}
