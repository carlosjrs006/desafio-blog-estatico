import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    
  userName?: string | null;
  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  logout(){
    this.authService.removeAccessToken();
    this.router.navigateByUrl('/login');
  }
}
