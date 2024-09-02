import { Component, Input, Output, EventEmitter } from '@angular/core';
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

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
export class TaskItemComponent {
  @Input() task!: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    imageUrl: string | null;
    userId: number;
    createdAt: string;
    updatedAt: string;
  };

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
}
