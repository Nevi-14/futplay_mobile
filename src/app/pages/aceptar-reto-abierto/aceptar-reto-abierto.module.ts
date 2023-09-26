import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceptarRetoAbiertoPageRoutingModule } from './aceptar-reto-abierto-routing.module';

import { AceptarRetoAbiertoPage } from './aceptar-reto-abierto.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceptarRetoAbiertoPageRoutingModule,
    PipesModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [AceptarRetoAbiertoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceptarRetoAbiertoPageModule {}
