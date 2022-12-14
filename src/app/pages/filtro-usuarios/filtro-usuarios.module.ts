import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroUsuariosPageRoutingModule } from './filtro-usuarios-routing.module';

import { FiltroUsuariosPage } from './filtro-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroUsuariosPageRoutingModule
  ],
  declarations: [FiltroUsuariosPage]
})
export class FiltroUsuariosPageModule {}
