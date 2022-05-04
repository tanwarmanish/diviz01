import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImports } from './const/material.const';
import { SelectDropdownComponent } from './components/select-dropdown/select-dropdown.component';

@NgModule({
  declarations: [SelectDropdownComponent],
  imports: [CommonModule, ...MaterialImports],
  exports: [...MaterialImports, SelectDropdownComponent],
})
export class SharedModule {}
