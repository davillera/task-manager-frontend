import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private apiURL = environment.apiUrl

  constructor() { }

  getTasks(query: any = '') {
    return this.http.get(`${this.apiURL}/tasks/search?query=${query}`);
  }

  createTask(data: any){
    return this.http.post(`${this.apiURL}/tasks`, data);
  }

  updateTask(data: any){
    return this.http.put(`${this.apiURL}/tasks/${data.id}`, data);
  }

  deleteTask(id: number){
    return this.http.delete(`${this.apiURL}/tasks/${id}`);
  }

  getTaskById(taskId: number) {
    return this.http.get(`${this.apiURL}/tasks/${taskId}`);
  }
}
