import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilUsuarioPageRoutingModule } from './editar-perfil-usuario-routing.module';

import { EditarPerfilUsuarioPage } from './editar-perfil-usuario.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilUsuarioPageRoutingModule,
    PipesModule
  ],
  declarations: [EditarPerfilUsuarioPage]
})
export class EditarPerfilUsuarioPageModule {}
