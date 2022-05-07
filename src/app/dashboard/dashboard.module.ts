import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { CardsComponent } from './cards/cards.component';
import { RevenueComponent } from './revenue/revenue.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { CardNavbarComponent } from './card-navbar/card-navbar.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { SharedModule } from '../shared/shared.module';
import { QuotesStatusComponent } from './quotes-status/quotes-status.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardsComponent,
    RevenueComponent,
    PipelineComponent,
    QuotesStatusComponent,
    CardNavbarComponent,
    CardFooterComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
