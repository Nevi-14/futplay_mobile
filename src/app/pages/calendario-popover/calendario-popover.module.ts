import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPopoverPageRoutingModule } from './calendario-popover-routing.module';

import { CalendarioPopoverPage } from './calendario-popover.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPopoverPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CalendarioPopoverPage]
})
export class CalendarioPopoverPageModule {}
