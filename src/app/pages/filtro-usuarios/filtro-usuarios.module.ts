import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroUsuariosPageRoutingModule } from './filtro-usuarios-routing.module';

import { FiltroUsuariosPage } from './filtro-usuarios.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroUsuariosPageRoutingModule,
    PipesModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [FiltroUsuariosPage]
})
export class FiltroUsuariosPageModule {}
