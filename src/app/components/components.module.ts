import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCardComponent } from './doc-card/doc-card.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [DocCardComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [DocCardComponent, HeaderComponent],
})
export class ComponentsModule {}
