import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HarvestPageRoutingModule } from './harvest-routing.module';

import { HarvestPage } from './harvest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HarvestPageRoutingModule
  ],
  declarations: [HarvestPage]
})
export class HarvestPageModule {}
