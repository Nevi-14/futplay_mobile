import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubInfoPageRoutingModule } from './club-info-routing.module';

import { ClubInfoPage } from './club-info.page';
import { UsuariosPipe } from '../../pipes/usuarios.pipe';
import { CantonesPipe } from '../../pipes/cantones.pipe';
import { DistritosPipe } from '../../pipes/distritos.pipe';
import { ProvinciasPipe } from '../../pipes/provincias.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubInfoPageRoutingModule
  ],
  declarations: [ClubInfoPage, UsuariosPipe,ProvinciasPipe, CantonesPipe, DistritosPipe]
})
export class ClubInfoPageModule {}
