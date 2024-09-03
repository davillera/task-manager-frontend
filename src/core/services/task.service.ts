import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private apiURL = "http://localhost:3000"

  constructor() { }

  getTasks(query: any = '') {
    return this.http.get(`${this.apiURL}/task/search?query=${query}`);
  }

  createTask(data: any){
    return this.http.post(`${this.apiURL}/task`, data);
  }

  updateTask(data: any){
    return this.http.put(`${this.apiURL}/task/${data.id}`, data);
  }

  deleteTask(id: number){
    return this.http.delete(`${this.apiURL}/task/${id}`);
  }

  getTaskById(taskId: number) {
    return this.http.get(`${this.apiURL}/task/${taskId}`);
  }
}
