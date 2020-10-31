import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverPage } from './deliver.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverPageRoutingModule {}
