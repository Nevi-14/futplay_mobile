import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ComponentsModule } from '../../components/components.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ProvinciasPipe } from '../../pipes/provincias.pipe';
import { CantonesPipe } from 'src/app/pipes/cantones.pipe';
import { DistritosPipe } from 'src/app/pipes/distritos.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    AngularFileUploaderModule
  ],
  declarations: [ProfilePage, ProvinciasPipe, CantonesPipe, DistritosPipe]
})
export class ProfilePageModule {}
