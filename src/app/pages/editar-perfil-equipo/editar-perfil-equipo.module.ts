import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilEquipoPageRoutingModule } from './editar-perfil-equipo-routing.module';

import { EditarPerfilEquipoPage } from './editar-perfil-equipo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilEquipoPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [EditarPerfilEquipoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarPerfilEquipoPageModule {}
