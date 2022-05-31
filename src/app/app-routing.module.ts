import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'warehouse',
    loadChildren: () =>
      import('./warehouse/warehouse.module').then((m) => m.WarehouseModule),
  },
  {
    path: 'freight',
    loadChildren: () =>
      import('./warehouse/warehouse.module').then((m) => m.WarehouseModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
