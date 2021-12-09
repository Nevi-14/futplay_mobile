import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPagePageRoutingModule } from './calendar-page-routing.module';

import { CalendarPagePage } from './calendar-page.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [CalendarPagePage]
})
export class CalendarPagePageModule {}
