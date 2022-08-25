import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarEquipoPageRoutingModule } from './eliminar-equipo-routing.module';

import { EliminarEquipoPage } from './eliminar-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarEquipoPageRoutingModule
  ],
  declarations: [EliminarEquipoPage]
})
export class EliminarEquipoPageModule {}
