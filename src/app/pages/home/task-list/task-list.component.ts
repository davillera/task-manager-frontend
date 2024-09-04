import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from "../../../../core/services/task.service";
import { MessageService } from "primeng/api";
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "./task-item/task-item.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonDirective } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import {ImageService} from "../../../../core/services/image.service";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskItemComponent,
    FormsModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    ButtonDirective,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  private taskService = inject(TaskService);
  private messageService = inject(MessageService);
  private imageService = inject(ImageService);

  tasks: any[] = []; // Variable para almacenar las tareas
  editMode: boolean = false;
  public createTaskForm: FormGroup = new FormGroup({});
  private formBuilder = inject(FormBuilder);

  isCreateTaskModal: boolean = false;
  currentTaskId: number | null = null;  // Almacena el ID de la tarea que se está editando

  ngOnInit() {
    this.getTasks();
    this.initializeCreateTaskForm()
  }

  getTasks(query?: any) {
    this.taskService.getTasks(query).subscribe({
      next: (data: any) => {
        this.tasks = data;
        console.log('Tareas obtenidas:', this.tasks);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
      }
    });
  }

  searchTask(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;

    // Llama al servicio para buscar tareas según el query
    this.getTasks(query);
  }

  createTask() {
    const taskData = {
      title: this.createTaskForm.get('title')?.value,
      description: this.createTaskForm.get('description')?.value,
      userId: this.createTaskForm.get('userId')?.value,
    };

    this.taskService.createTask(taskData).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea creada con éxito' });
        this.uploadImage(response.id);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      },
      complete: () => {
        this.getTasks()
        this.resetForm();
      }
    });
  }

  uploadImage(taskId: number) {
    const formData = new FormData();
    const imageFile = this.createTaskForm.get('image')?.value;

    if (imageFile) {
      formData.append('file', imageFile);
      formData.append('taskId', taskId.toString());

      this.imageService.uploadImage(formData).subscribe({
        next: () => {
          this.getTasks();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error Al Subir la imagen" });
        }
      });
    }
  }



  updateTask(data: any) {
    console.log(data)
    this.uploadImage(data.id);
    this.taskService.updateTask(data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea actualizada con éxito' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      },
      complete: () => {
        this.getTasks();
        this.resetForm()
      }
    });
  }

  onTaskDeleted(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea eliminada con éxito' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      }
    });
  }

  generateTask() {
    if(!this.editMode){
      this.createTask();
    } else {
      this.updateTask(this.createTaskForm.value);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.createTaskForm.patchValue({ image: file });
    }
  }


  initializeCreateTaskForm() {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userId: [sessionStorage.getItem("user_id")],
      id: [],
      image: [null]  // Campo para la imagen
    });

  }

  onTaskCompleted(data: any) {
    const updatedData = {
      ...data,
      completed: !data.completed
    };

    console.log(updatedData)

    this.updateTask(updatedData)

  }

  onTaskEdit(task: any) {
    this.isCreateTaskModal = true;
    this.editMode = true;
    this.createTaskForm.patchValue({
      title: task.title,
      description: task.description,
      id: task.id,
    });

  }

  resetForm() {
    this.isCreateTaskModal = false;
    this.editMode = false;
    this.createTaskForm.reset()
    this.initializeCreateTaskForm()
  }



}
