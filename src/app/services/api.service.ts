import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';
import { Idea, IdeaDTO } from '@app/models/idea';
import { Comment, CommentDTO } from '@app/models/comment';
import { RequestMethods } from '@app/models/request-methods';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly api = `${environment.api_server}/api`;

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  private request(method: RequestMethods, endpoint: string, body?: any): Observable<any> {
    const url = `${this.api}/${endpoint}`;

    return this.http.request(
      method,
      url,
      {
        body,
        headers: {
          authorization: `Bearer ${this.auth.token}`
        }
      });
  }

  getUsers(page?: number): Observable<User[]> {
    const endpoint = page ? `users?page=${page}` : 'users';
    return this.request(RequestMethods.GET, endpoint);
  }

  getUser(username: string): Observable<User> {
    return this.request(RequestMethods.GET, `users/${username}`);
  }

  getIdeas(page?: number): Observable<Idea[]> {
    const endpoint = page ? `ideas?page=${page}` : 'ideas';
    return this.request(RequestMethods.GET, endpoint);
  }

  getNewestIdeas(page?: number): Observable<Idea[]> {
    const endpoint = page ? `ideas?page=${page}&order=DESC` : 'ideas?order=DESC';
    return this.request(RequestMethods.GET, endpoint);
  }

  getIdea(id: string): Observable<Idea> {
    return this.request(RequestMethods.GET, `ideas/${id}`);
  }

  createIdea(data: IdeaDTO): Observable<Idea> {
    return this.request(RequestMethods.POST, `ideas`, data);
  }

  updateIdea(id: string, data: Partial<IdeaDTO>): Observable<Idea> {
    return this.request(RequestMethods.PUT, `ideas/${id}`, data);
  }

  deleteIdea(id: string): Observable<Idea> {
    return this.request(RequestMethods.DELETE, `ideas/${id}`);
  }

  upvoteIdea(id: string): Observable<Idea> {
    return this.request(RequestMethods.POST, `ideas/${id}/upvote`);
  }

  downvoteIdea(id: string): Observable<Idea> {
    return this.request(RequestMethods.POST, `ideas/${id}/downvote`);
  }

  bookmarkIdea(id: string): Observable<User> {
    return this.request(RequestMethods.POST, `ideas/${id}/bookmark`);
  }

  unbookmarkIdea(id: string): Observable<User> {
    return this.request(RequestMethods.DELETE, `ideas/${id}/bookmark`);
  }

  getCommentsByIdea(idea: string, page?: number): Observable<Comment[]> {
    const endpoint = page
      ? `comments/idea/${idea}?page=${page}`
      : `comments/idea/${idea}`;
    return this.request(RequestMethods.GET, endpoint);
  }

  getCommentsByUser(user: string, page?: number): Observable<Comment[]> {
    const endpoint = page
      ? `comments/user/${user}?page=${page}`
      : `comments/user/${user}`;
    return this.request(RequestMethods.GET, endpoint);
  }

  getComment(id: string): Observable<Comment> {
    return this.request(RequestMethods.GET, `comments/${id}`);
  }

  createComment(idea: string, data: CommentDTO): Observable<Comment> {
    return this.request(RequestMethods.POST, `comments/idea/${idea}`, data);
  }

  deleteComment(id: string): Observable<Comment> {
    return this.request(RequestMethods.DELETE, `comments/${id}`);
  }
}
