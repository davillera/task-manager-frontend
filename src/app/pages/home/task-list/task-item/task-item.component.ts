import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Router} from "@angular/router";

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

  private router = inject(Router);
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
}
