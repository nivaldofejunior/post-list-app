import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-delete-buttons',
  templateUrl: './edit-delete-buttons.component.html',
  styleUrls: ['./edit-delete-buttons.component.css'],
  imports: [CommonModule]
})
export class EditDeleteButtonsInlineComponent {
  @Input() editText: string = 'Editar';
  @Input() deleteText: string = 'Excluir';
  @Input() editClass: string = 'bg-blue-500 text-white hover:bg-blue-600';
  @Input() deleteClass: string = 'bg-red-500 text-white hover:bg-red-600';
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  isDeleteModalOpen: boolean = false;

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  openDeleteModal(): void {
    console.log(1)
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  confirmDelete(): void {
    this.delete.emit();
    this.closeDeleteModal();
  }
}
