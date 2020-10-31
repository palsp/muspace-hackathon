import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SizePage } from './size.page';

const routes: Routes = [
  {
    path: '',
    component: SizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizePageRoutingModule {}
