import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImports } from './const/material.const';
import { SelectDropdownComponent } from './components/select-dropdown/select-dropdown.component';
import { ChartComponent } from './components/chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatasetService } from './services/faker/dataset.service';
import { HighchartComponent } from './components/highchart/highchart.component';
import { StructureComponent } from './components/structure/structure.component';
import { PercentPipe } from './percent.pipe';

@NgModule({
  declarations: [
    SelectDropdownComponent,
    ChartComponent,
    HighchartComponent,
    StructureComponent,
    PercentPipe,
  ],
  imports: [CommonModule, ...MaterialImports, HighchartsChartModule],
  exports: [
    ...MaterialImports,
    SelectDropdownComponent,
    ChartComponent,
    HighchartsChartModule,
    StructureComponent,
    PercentPipe,
  ],
  providers: [DatasetService],
})
export class SharedModule {}
