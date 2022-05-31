import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';

@NgModule({
  declarations: [WarehouseComponent],
  imports: [CommonModule, WarehouseRoutingModule],
})
export class WarehouseModule {}
