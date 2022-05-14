import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { RevenueComponent } from './revenue/revenue.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { CardNavbarComponent } from './card-navbar/card-navbar.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { SharedModule } from '../shared/shared.module';
import { QuotesStatusComponent } from './quotes-status/quotes-status.component';
import { SummaryComponent } from './summary/summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeatmapComponent } from './heatmap/heatmap.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RevenueComponent,
    PipelineComponent,
    QuotesStatusComponent,
    CardNavbarComponent,
    CardFooterComponent,
    SummaryComponent,
    HeatmapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
