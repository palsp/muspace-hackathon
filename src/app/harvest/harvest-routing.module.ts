import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HarvestPage } from './harvest.page';

const routes: Routes = [
  {
    path: '',
    component: HarvestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HarvestPageRoutingModule {}
