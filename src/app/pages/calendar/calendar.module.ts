import {  LOCALE_ID, NgModule, ViewChild } from '@angular/core';
import { CommonModule,registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import {NgCalendarModule} from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';
import localeDe from '@angular/common/locales/es';
registerLocaleData(localeDe);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
    
  ],
  declarations: [CalendarPage],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
})
export class CalendarPageModule {


}
