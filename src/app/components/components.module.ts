import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { ProfileComponent } from './profile-component/profile-component';
import { JoinClubComponent } from './join-club-component/join-club-component';
import { PipesModule } from '../pipes/pipes.module';
import { SettingInfoComponent } from '../../../../FUTPLAY - copia (2)/src/app/components/setting-info/setting-info.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ClubInfoComponent,
    ProfileComponent,
    JoinClubComponent,
    SettingInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports:[
  HeaderComponent,
  ClubInfoComponent,
  ProfileComponent,
  JoinClubComponent,
  SettingInfoComponent
  ]
  
})
export class ComponentsModule { }
