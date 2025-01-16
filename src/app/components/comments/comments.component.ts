import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActionButtonsComponent } from '../save-cancel-buttons/save-cancel-buttons.component.';
import { EditDeleteButtonsInlineComponent } from '../edit-delete-buttons/edit-delete-buttons.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, ActionButtonsComponent, EditDeleteButtonsInlineComponent],
  templateUrl: 'comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;  
  @Output() commentAdded = new EventEmitter<any>();
  @Output() commentEdited = new EventEmitter<any>();
  @Output() commentDeleted = new EventEmitter<number>();

  constructor(private postService: PostService) {}
  
  isEditCommentModalOpen: boolean = false;
  editingComment: any = null;
  newComment: any = { body: '' };
  comments: any[] = [];
  isCommentEmpty: boolean = false;

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (!this.postId) {
      console.error('Post ID não fornecido para carregar comentários.');
      return;
    }

    this.postService.fetchComments(this.postId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error(`Erro ao carregar comentários para o post ${this.postId}:`, err);
      },
    });
  }

  addComment(): void {
    if (!this.newComment.body.trim()) {
      this.isCommentEmpty = true;
      console.error('O comentário não pode estar vazio!');
      return;
    }

    this.isCommentEmpty = false;
  
    const newComment = {
      id: Math.floor(Math.random() * 1000), // Gerar um ID fictício
      body: this.newComment.body.trim(),
      name: this.newComment.name?.trim() || 'Usuário Anônimo', // Nome ou "Usuário Anônimo"
    };
  
    this.comments.push(newComment); // Adiciona o comentário à lista
    this.newComment = { body: '', name: '' }; // Limpa os campos após adicionar o comentário
    console.log('Comentário adicionado:', newComment);
  }

  editComment(comment: any): void {
    this.editingComment = { ...comment };
  }

  openEditCommentModal(comment: any) {
    if (!comment) {
      console.error('Comentário inválido para edição!');
      return;
    }
    this.editingComment = { ...comment };
    this.isEditCommentModalOpen = true;
  }

  closeEditCommentModal() {
    this.isEditCommentModalOpen = false;
    this.editingComment = null;
  }

  saveEditComment() {
    if (!this.editingComment) {
      console.error('Nenhum comentário está sendo editado!');
      return;
    }

    if (this.editingComment === "" || this.editingComment.body.trim() === ""){
      return;
    }
  
    const index = this.comments.findIndex(c => c.id === this.editingComment.id);
    if (index > -1) {
      this.comments[index] = { ...this.editingComment };
      console.log('Comentário editado com sucesso:', this.editingComment);
    }
  
    this.closeEditCommentModal();
  }

  deleteComment(commentId: number): void {
    this.comments = this.comments.filter((c) => c.id !== commentId);
    this.commentDeleted.emit(commentId);
  }
}
