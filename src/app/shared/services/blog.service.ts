import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8080';
  private eventSource!: EventSource;

  constructor(private http: HttpClient) {}

  getAllPosts():Observable<any>{
    const url = `${this.apiUrl}/publicacao`;
    return this.http.get<any>(url);
  }

  excluirComentario(id: number):Observable<any>{
    const url = `${this.apiUrl}/publicacao/comments`;
    return this.http.delete<any>(`${url}/${id}`);
  }

  excluirPostagem(id: number):Observable<any>{
    const url = `${this.apiUrl}/publicacao`;
    return this.http.delete<any>(`${url}/${id}`);
  }

  addComments(formdata: any):Observable<any>{
    const url = `${this.apiUrl}/publicacao/comments`;
    return this.http.post<any>(url,formdata);
  }

  addPost(formdata:any):Observable<any>{
    const url = `${this.apiUrl}/publicacao`;
    return this.http.post<any>(url,formdata);
  }

  uploadImagens(files: File[]): Observable<any> {
    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file, file.name);
    }

    const headers = new HttpHeaders();

    return this.http.post<any>(`${this.apiUrl}/file/upload`, formData, {
      headers,
    });
  }

  initSSE(): Observable<any> {
    this.eventSource = new EventSource('http://localhost:8080/publicacao/subscribe');


    return new Observable<any>(observer => {
      this.eventSource.addEventListener('novo-comentarios', event => {
        const eventData = JSON.parse((event as MessageEvent).data);
        observer.next(eventData);
      });

      this.eventSource.onerror = error => {
        observer.error(error);
      };
    });
  }


    closeSSE() {
      if (this.eventSource) {
        this.eventSource.close();
      }
    }
}
