import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-blog-desafio';
  constructor(
    public loaderService: LoaderService,
    public authService: AuthService
  ){
  }

}
