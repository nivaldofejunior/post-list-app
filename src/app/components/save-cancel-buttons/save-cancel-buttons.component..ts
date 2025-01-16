import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-cancel-buttons',
  templateUrl: './save-cancel-buttons.component.html',
  styleUrls: ['./save-cancel-buttons.component.css'],
  imports: [CommonModule]
})
export class ActionButtonsComponent {
  @Input() confirmText: string = 'Salvar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmClass: string = 'bg-blue-500 text-white hover:bg-blue-600';
  @Input() cancelClass: string = 'bg-gray-500 text-white hover:bg-gray-600';
  @Input() disabled: boolean = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  

  onConfirm() {
    console.log("confirmei")
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
