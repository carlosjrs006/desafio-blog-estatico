import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent {
  newComment: string = '';

  constructor(public dialogRef: MatDialogRef<CommentModalComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
