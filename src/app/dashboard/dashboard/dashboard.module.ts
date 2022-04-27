import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { CardsComponent } from '../cards/cards.component';

@NgModule({
  declarations: [DashboardComponent, CardsComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
