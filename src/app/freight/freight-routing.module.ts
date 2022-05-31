import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreightComponent } from './freight.component';

const routes: Routes = [
  {
    path: '',
    component: FreightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreightRoutingModule {}
