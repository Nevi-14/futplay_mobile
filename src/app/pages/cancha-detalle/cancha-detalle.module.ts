import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanchaDetallePageRoutingModule } from './cancha-detalle-routing.module';

import { CanchaDetallePage } from './cancha-detalle.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanchaDetallePageRoutingModule,
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  declarations: [CanchaDetallePage],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CanchaDetallePageModule {}