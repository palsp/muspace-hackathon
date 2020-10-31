import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverPageRoutingModule } from './deliver-routing.module';

import { DeliverPage } from './deliver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverPageRoutingModule
  ],
  declarations: [DeliverPage]
})
export class DeliverPageModule {}
