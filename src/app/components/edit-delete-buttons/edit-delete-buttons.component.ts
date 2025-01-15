import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-delete-buttons',
  templateUrl: './edit-delete-buttons.component.html',
  styleUrls: ['./edit-delete-buttons.component.css'],
  imports: [CommonModule]
})
export class EditDeleteButtonsInlineComponent {
  @Input() editText: string = 'Editar'; // Texto do botão de edição
  @Input() deleteText: string = 'Excluir'; // Texto do botão de exclusão
  @Input() editClass: string = 'bg-blue-500 text-white hover:bg-blue-600'; // Classe de estilo para o botão de edição
  @Input() deleteClass: string = 'bg-red-500 text-white hover:bg-red-600'; // Classe de estilo para o botão de exclusão
  @Output() edit = new EventEmitter<void>(); // Evento ao clicar no botão de edição
  @Output() delete = new EventEmitter<void>(); // Evento ao clicar no botão de exclusão

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
