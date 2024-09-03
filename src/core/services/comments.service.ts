import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  private http = inject(HttpClient);
  private apiURL = "http://localhost:3000"

  getComments(taskId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/comments/task/${taskId}`);
  }

  addComment(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/comments`, data);
  }

  updateComment(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/comments/${data.id}`, data);
  }

  deleteComment(id: number) {
    return this.http.delete(`${this.apiURL}/comments/${id}`);
  }
}
