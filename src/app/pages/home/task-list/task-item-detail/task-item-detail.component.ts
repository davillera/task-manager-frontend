import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from "../../../../../core/services/task.service";
import { MessageService } from "primeng/api";
import {CommentsService} from "../../../../../core/services/comments.service";
import {CommonModule, DatePipe} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-task-item-detail',
  standalone: true,
  templateUrl: './task-item-detail.component.html',
  imports: [
    DatePipe,
    CommonModule,
    InputTextModule,
    ButtonDirective,
    FormsModule,
    DialogModule,
    InputTextareaModule
  ],
  styleUrls: ['./task-item-detail.component.scss']
})
export class TaskItemDetailComponent implements OnInit {

  task: any;
  comments: any[] = [];

  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private messageService = inject(MessageService)
  private commentsService = inject(CommentsService);
  taskId: any;
  isEditCommentModalVisible: boolean = false
  comment: any;
  textComment: string = ''
  dataComment: any;

  constructor(

  ) {}

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'))

    if (this.taskId) {
      this.getTaskDetails(this.taskId);
      this.getComments(this.taskId);
    }
  }

  getTaskDetails(taskId: number) {
    this.taskService.getTaskById(taskId).subscribe({
      next: (task: any) =>{
        this.task = task;
      }
    });
  }

  getComments(taskId: number) {
    this.commentsService.getComments(taskId).subscribe({
      next: (data: any) => {
        this.comments = data;
      }
    });
  }

  addComment(data: any) {
    data = {
      "content": data,
      "taskId": this.taskId,
    }

    if (this.comment) {
      this.commentsService.addComment(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comentario agregado con éxito' });
          this.commentsService.getComments(this.task.id);
          this.comment=''
        },
        error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err }),
        complete: () => {
          this.getComments(this.task.id);
          this.comment=''
        }
      });
    }
  }

  openEditCommentModal(comment: any) {
    this.dataComment = comment
    this.textComment = comment.content
    this.isEditCommentModalVisible = true

  }

  updateComment() {
    const data = {
      "content": this.textComment,
      "id": this.dataComment.id
    }
    console.log(data)
    this.commentsService.updateComment(data).subscribe({
      next: () => {

      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      },
      complete: () => {
        this.getComments(this.taskId)
        this.isEditCommentModalVisible = false
      }
    })
  }

  deleteComment(comment: any) {
    this.commentsService.deleteComment(comment.id).subscribe({
      next: () => {
        this.getComments(this.taskId)
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      },
      complete: () => {
        this.getComments(this.taskId)
      }
    })
  }
}
