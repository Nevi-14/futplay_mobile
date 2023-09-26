import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceptarRetoPageRoutingModule } from './aceptar-reto-routing.module';

import { AceptarRetoPage } from './aceptar-reto.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceptarRetoPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [AceptarRetoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceptarRetoPageModule {}
