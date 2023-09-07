import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilUsuarioPageRoutingModule } from './editar-perfil-usuario-routing.module';

import { EditarPerfilUsuarioPage } from './editar-perfil-usuario.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilUsuarioPageRoutingModule,
    PipesModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [EditarPerfilUsuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarPerfilUsuarioPageModule {}
