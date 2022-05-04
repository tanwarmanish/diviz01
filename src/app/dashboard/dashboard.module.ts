import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { CardsComponent } from './cards/cards.component';
import { RevenueComponent } from './revenue/revenue.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardsComponent,
    RevenueComponent,
    SummaryComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
