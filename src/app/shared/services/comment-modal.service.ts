import { ChangeDetectorRef, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentModalComponent } from 'src/app/pages/comment-modal/comment-modal.component';
import { PostModalComponent } from 'src/app/pages/post-modal/post-modal.component';
import { BlogService } from './blog.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentModalService {
 

  fileList: string[] = [];

  constructor(private dialog: MatDialog, private blogService: BlogService, private router: Router) { 
   
  }

 

  openModal(postId: number): void {
   const dialogRef = this.dialog.open(CommentModalComponent, {
      width: '600px',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        console.log('Dados recebidos da modal:', formData);
        console.log('Id recebidos da modal:', postId);

        const formDataRequest = {
            comentario: formData,
            idPostagem: postId
        }
        this.blogService.addComments(formDataRequest).subscribe((res) =>{})
      }
    });
  }

  openModalAddPost(): void {
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: '600px', // Defina a largura desejada
      disableClose: true // Defina como true se desejar impedir que a modal seja fechada clicando fora dela
    });

    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        console.log('Dados recebidos da modal:', formData);
        if (formData.images.length > 0) {
          this.blogService.uploadImagens(formData.images)
            .subscribe((uploadedFileNames: any) => {
              if (uploadedFileNames) {
              const imagensRetornadaStorage = uploadedFileNames;
              
              var formRequest = {
                titulo: formData.titulo,
                descricao:formData.descricao,
                imagens: imagensRetornadaStorage
              }
              console.log('formRequest: ', formRequest);
              this.blogService.addPost(formRequest).subscribe((res) =>{
                document.location.reload();
              })
            }
          }, error => {
              console.error('Erro no upload de arquivos:', error);
          });
        }else{
          var formRequest = {
            titulo: formData.titulo,
            descricao:formData.descricao
          }
          this.blogService.addPost(formRequest).subscribe((res) =>{
            document.location.reload();
          })
        }

      }
    });
  }
}
