import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ClubInfoComponent } from './club-info/club-info.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { JoinClubComponentComponent } from './join-club-component/join-club-component.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    HeaderComponent,
    ClubInfoComponent,
    ProfileComponentComponent,
    JoinClubComponentComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule

  ],
  exports:[
  HeaderComponent,
  ClubInfoComponent,
  ProfileComponentComponent,
  JoinClubComponentComponent
  ]
})
export class ComponentsModule { }
