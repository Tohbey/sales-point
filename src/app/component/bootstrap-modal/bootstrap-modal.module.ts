import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalComponent } from './modal/modal.component';

const COMPONENTS: any[] = [
  ModalBodyComponent,
  ModalHeaderComponent,
  ModalFooterComponent,
  ModalComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  exports: [...COMPONENTS],
})
export class BootstrapModalModule {}
