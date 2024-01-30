import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  constructor(
    private router: Router,
    private loginService:LoginService,
    private fb: FormBuilder
  ){

  }

  login(){
    this.loginService.login(this.loginForm.value).subscribe((res)=>{
      this.router.navigate(['/blog']);
    })
  }
  
  irParaLogin(){
    this.router.navigateByUrl('/cadastro');
  }

 
}
