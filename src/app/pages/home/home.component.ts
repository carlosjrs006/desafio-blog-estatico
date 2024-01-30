import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { CommentModalService } from 'src/app/shared/services/comment-modal.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';


interface Comment {
  idComentario: number;
  comentario: string;
  dataCriacao:string;
  usuario: {
    login: string;
  };
  idPublicacao: number;
}

interface Post {
  idPublicacao: number;
  titulo: string;
  descricao: string;
  imagens: any[];
  usuario: {
    login: string;
  };
  comentarios: Comment[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private eventSource!: EventSource;

  private sseSubscription!: Subscription;

  newComment: string = '';
  posts: any[] = [];
  comments: Comment[] = [];
  mostrarCards = false;

  imageUrls: string[] = [];

  constructor(private commentModalService: CommentModalService, private blogService: BlogService, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.sseSubscription = this.blogService.initSSE().subscribe(
      data => {
        var dataNew = {
          idComentario: data.idComentario,
          comentario: data.comentario,
          usuario: {
            login: data.usuario
          },
          dataCriacao: data.data,
          idPublicacao: data.idPublicacao
        }

       this.posts.forEach((post)=>{
        if(post.idPublicacao === dataNew.idPublicacao){
          post.comentarios.unshift({...dataNew});
        }
       })
        this.cdr.detectChanges();
      },
      error => {
        console.error('Erro na conexão SSE:', error);
      }
    );
  }

  ngOnDestroy() {
    this.blogService.closeSSE(); 
    this.sseSubscription.unsubscribe(); 
  }

  ngOnInit(): void {
    this.blogService.getAllPosts().subscribe((res) => {
     
      if(res){
        this.posts = res;
      }

      this.posts.forEach((post) =>{
        this.comments = post.comentarios;
        console.log('this.comments: ', this.comments)
      })
      
      this.mostrarCards = true;
    }, (error) => {
      this.posts = [];
    });
  }

  verifyCriador(item: any):boolean{

    var userToken = this.authService.getUserName();
      if(item.usuario.login === userToken){
        return true;
      }else{
        return false;
      }
  }

  excluirComentarios(comentId: number){
    this.blogService.excluirComentario(comentId).subscribe((res) => {
      window.location.reload();
  })
  }

  excluirPost(postId: number): void {
    this.blogService.excluirPostagem(postId).subscribe((res) => {
        window.location.reload();
    })
  }

  openCommentModal(postId: number): void {
    this.commentModalService.openModal(postId);
  }

  openPostModal(): void {
    this.commentModalService.openModalAddPost();
  }
}
