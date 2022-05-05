import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImports } from './const/material.const';
import { SelectDropdownComponent } from './components/select-dropdown/select-dropdown.component';
import { ChartComponent } from './components/chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [SelectDropdownComponent, ChartComponent],
  imports: [CommonModule, ...MaterialImports, HighchartsChartModule],
  exports: [...MaterialImports, SelectDropdownComponent, ChartComponent],
})
export class SharedModule {}
