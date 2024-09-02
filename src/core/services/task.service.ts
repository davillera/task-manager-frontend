import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private apiURL = "http://localhost:3000"

  constructor() { }

  getTasks() {
    return this.http.get(`${this.apiURL}/task`);
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
}
