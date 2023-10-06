import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactarDesarolladorPageRoutingModule } from './contactar-desarollador-routing.module';

import { ContactarDesarolladorPage } from './contactar-desarollador.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactarDesarolladorPageRoutingModule,
    TranslateModule
  ],
  declarations: [ContactarDesarolladorPage]
})
export class ContactarDesarolladorPageModule {}
