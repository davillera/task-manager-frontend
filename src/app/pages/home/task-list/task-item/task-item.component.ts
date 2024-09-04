import {Component, Input, Output, EventEmitter, inject, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router} from "@angular/router";
import {ImageService} from "../../../../../core/services/image.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
  imports: [
    DatePipe,
    NgClass,
    ButtonDirective,
    Ripple,
    NgIf
  ],
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit{

  private router = inject(Router);
  private imageService = inject(ImageService);
  private messageService = inject(MessageService)
  @Input() task!: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    image: any
    userId: number;
    createdAt: string;
    updatedAt: string;
  };

  ngOnInit() {
    this.getImage(this.task.id)
  }

  getImage(taskId: number) {
    this.imageService.getImage(taskId).subscribe({
      next: (data: any) => {
        this.task.image = data[data.length - 1]
      },
      error: (err: any) => {
        this.task.image = ""
      }
    })
  }

  goToDetail() {
    this.router.navigate(['/home/task', this.task.id]);
  }

  @Output() taskCompleted = new EventEmitter<number>();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskEdit = new EventEmitter<number>();

  toggleCompleteTask(task: any) {
    this.taskCompleted.emit(task);
  }

  editTask(task: any){
    this.taskEdit.emit(task);
  }

  deleteTask(task: any) {
    this.taskDeleted.emit(task.id);
  }

  deleteImage(id: number) {
    this.imageService.deleteImage(id).subscribe({
      next: () => {

      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error al borrar la imagen" });
      }
    })
  }
}
