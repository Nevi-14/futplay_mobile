import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ClubInfoComponent } from './club-info/club-info.component';
import { UsuariosPipe } from '../pipes/usuarios.pipe';
import { ProvinciasPipe } from '../pipes/provincias.pipe';
import { CantonesPipe } from '../pipes/cantones.pipe';
import { DistritosPipe } from '../pipes/distritos.pipe';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { JoinClubComponentComponent } from './join-club-component/join-club-component.component';
import { FiltroPipe } from '../pipes/filtro.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    ClubInfoComponent,
    ProfileComponentComponent,
    JoinClubComponentComponent,
     UsuariosPipe,
     ProvinciasPipe,
    CantonesPipe,
    DistritosPipe,
    FiltroPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
  HeaderComponent,
  ClubInfoComponent,
  ProfileComponentComponent,
  JoinClubComponentComponent
  ]
})
export class ComponentsModule { }
