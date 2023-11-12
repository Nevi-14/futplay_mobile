import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionRetosPageRoutingModule } from './gestion-retos-routing.module';

import { GestionRetosPage } from './gestion-retos.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionRetosPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [GestionRetosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionRetosPageModule {}
