import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { ProfileComponent } from './profile-component/profile-component';
import { JoinClubComponent } from './join-club-component/join-club-component';
import { PipesModule } from '../pipes/pipes.module';
import { SettingInfoComponent } from './setting-info/setting-info.component';
import { OpcionesComponent } from './opciones/opciones.component';
import {NgCalendarModule} from 'ionic2-calendar'
import { CalendarioComponent } from './calendar/calendario.component';
import localeDe from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { RetosTemplateComponent } from './retos-template/retos-template.component';
registerLocaleData(localeDe);
@NgModule({
  declarations: [
    HeaderComponent,
    ClubInfoComponent,
    ProfileComponent,
    JoinClubComponent,
    SettingInfoComponent,
    OpcionesComponent,
    CalendarioComponent,
    ReservacionesComponent,
    RetosTemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NgCalendarModule,

  ],
  exports:[
  HeaderComponent,
  ClubInfoComponent,
  ProfileComponent,
  JoinClubComponent,
  SettingInfoComponent,
  OpcionesComponent,
  CalendarioComponent,
  ReservacionesComponent,
  RetosTemplateComponent
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
  
})


export class ComponentsModule { }
