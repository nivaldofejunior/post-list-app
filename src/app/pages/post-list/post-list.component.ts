import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CommentsComponent } from '../../components/comments/comments.component';
import { ActionButtonsComponent } from '../../components/save-cancel-buttons/save-cancel-buttons.component.';
import { EditDeleteButtonsInlineComponent } from '../../components/edit-delete-buttons/edit-delete-buttons.component';
import { Comment } from '../../interface/comment.interface';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, CommentsComponent, ActionButtonsComponent, EditDeleteButtonsInlineComponent]
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  editingPost: any = null;
  comments: { [key: number]: Comment[] } = {};
  newComment: { [key: number]: string } = {};
  editingComment: any = null;
  isEditCommentModalOpen: boolean = false;
  
  constructor(private postService: PostService) {}

  

  ngOnInit() {
    this.fetchPosts()
  }

  openEditPostModal(post: any) {
    this.editingPost = { ...post };
  }

  closePostModal() {
    this.editingPost = null;
  }

  savePostChanges() {
    if (!this.editingPost || !this.editingPost.id) {
      console.error('O ID do post não está definido!');
      return;
    }

    if(this.editingPost === "" || this.editingPost.body.trim() === ""){
      return;
    }
  
    this.postService.updatePost(this.editingPost).subscribe(
      () => {
        const index = this.posts.findIndex(p => p.id === this.editingPost.id);
        if (index !== -1) {
          this.posts[index] = { ...this.editingPost };
        }
        this.closePostModal();
      },
      (error) => console.error('Erro ao salvar edição:', error)
    );
  }

  fetchPosts(): void {
    this.postService.fetchPosts().subscribe({
      next: (posts: any[]) => {
        this.posts = posts.map(post => ({
          ...post,
          comments: [] // Inicializa os comentários como um array vazio
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar posts:', err);
      }
    });
  }
  
  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== postId);
        console.log(`Post ${postId} excluído com sucesso.`);
      },
      error: (err) => {
        console.error('Erro ao excluir o post:', err);
      },
    });
  }

  onCommentAdded(newComment: { id?: number; body: string }, postId: number): void {
    const post = this.posts.find((p: any) => p.id === postId);
    if (post) {
      newComment.id = Math.floor(Math.random() * 1000);
      post.comments.push(newComment);
      console.log(`Comentário adicionado ao post ${postId}:`, newComment);
    }
  }
  
  onCommentEdited(updatedComment: { id: number; body: string }, postId: number): void {
    const post = this.posts.find((p: any) => p.id === postId);
    if (post) {
      const index = post.comments.findIndex((c: { id: number }) => c.id === updatedComment.id);
      if (index > -1) {
        post.comments[index] = { ...updatedComment };
        console.log(`Comentário atualizado no post ${postId}:`, updatedComment);
      }
    }
  }
  
  onCommentDeleted(postId: number, commentId: number): void {
    if (this.comments[postId]) {
      this.comments[postId] = this.comments[postId].filter(comment => comment.id !== commentId);
    }
  }
}