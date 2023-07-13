import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarRetoPageRoutingModule } from './eliminar-reto-routing.module';

import { EliminarRetoPage } from './eliminar-reto.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarRetoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EliminarRetoPage]
})
export class EliminarRetoPageModule {}
