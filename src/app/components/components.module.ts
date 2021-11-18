import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ClubInfoComponent } from './club-info/club-info.component';
import { PipesModule } from '../pipes/pipes.module';
import { JoinClubComponent } from './join-club-component/join-club-component';
import { ProfileComponent } from './profile-component/profile-component';


@NgModule({
  declarations: [
    HeaderComponent,
    ClubInfoComponent,
    ProfileComponent,
    JoinClubComponent,
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
  JoinClubComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
