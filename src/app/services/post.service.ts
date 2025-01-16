import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private postsApiUrl = `${this.apiUrl}/posts`;
  private commentsApiUrl = `${this.apiUrl}/comments`;

  private postsSubject = new BehaviorSubject<any[]>([]);
  public posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postsApiUrl);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.postsApiUrl, post).pipe(
      tap((newPost) => {
        const posts = [...this.postsSubject.value, newPost];
        this.postsSubject.next(posts);
      }),
      catchError((error) => {
        console.error('Erro ao criar post:', error);
        throw error;
      })
    );
  }

  updatePost(post: any): Observable<any> {
    return this.http.put(`${this.postsApiUrl}/${post.id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.postsApiUrl}/${id}`).pipe(
      tap(() => {
        const posts = this.postsSubject.value.filter((post) => post.id !== id);
        this.postsSubject.next(posts);
      }),
      catchError((error) => {
        console.error('Erro ao excluir post:', error);
        throw error;
      })
    );
  }

  fetchComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.commentsApiUrl}?postId=${postId}`);
  }
  
  createComment(postId: number, comment: any): Observable<any> {
    return this.http.post<any>(this.commentsApiUrl, {
      ...comment,
      postId,
    });
  }
  
  updateComment(comment: any): Observable<any> {
    return this.http.put<any>(`${this.commentsApiUrl}/${comment.id}`, comment);
  }
  
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.commentsApiUrl}/${commentId}`);
  }
}
