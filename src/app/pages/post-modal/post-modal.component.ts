import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/shared/services/blog.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {
  
  postFormGroup!: FormGroup;
  items!: any[];
  images = [{}];
  maxFileSize = 1000000;
  uploadedFiles: any[] = [];
  fileLimit = 3;
  chooseLabel = 'Buscar arquivo';

  constructor(public dialogRef: MatDialogRef<PostModalComponent>, private formBuilder: FormBuilder
    ,private blogService: BlogService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.postFormGroup = this.formBuilder.group({
      newPostTitle: ['', Validators.required],
      newPostDescription: ['', Validators.required]
    });
  }

  getFormData() {
    const formData = {
      titulo: this.postFormGroup.get('newPostTitle')?.value,
      descricao: this.postFormGroup.get('newPostDescription')?.value,
      images:this.uploadedFiles,
    };
    return formData;
  }

  
  onFileSelect(event: any): void {
    if (this.uploadedFiles.length < this.fileLimit) {
      this.uploadedFiles.push(event.files[0]);
    } else {
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}