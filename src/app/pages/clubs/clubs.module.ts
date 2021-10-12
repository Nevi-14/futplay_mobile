import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubsPageRoutingModule } from './clubs-routing.module';

import { ClubsPage } from './clubs.page';
import { ComponentsModule } from '../../components/components.module';
import { UsuariosPipe } from '../../pipes/usuarios.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClubsPage,UsuariosPipe]
})
export class ClubsPageModule {}
