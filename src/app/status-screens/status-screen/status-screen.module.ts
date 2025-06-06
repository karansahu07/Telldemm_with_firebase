import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusScreenPageRoutingModule } from './status-screen-routing.module';

import { StatusScreenPage } from './status-screen.page';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusScreenPageRoutingModule
  ],
  // declarations: [StatusScreenPage]
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatusScreenPageModule {}
