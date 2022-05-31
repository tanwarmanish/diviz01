import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreightComponent } from './freight.component';
import { FreightRoutingModule } from './freight-routing.module';

@NgModule({
  declarations: [FreightComponent],
  imports: [CommonModule, FreightRoutingModule],
})
export class FreightModule {}
