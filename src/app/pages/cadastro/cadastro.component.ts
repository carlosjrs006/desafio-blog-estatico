import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit{

  cadastroForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService:LoginService,
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      email:['', [Validators.required,Validators.email]]
    });
  }
  
  irParaLogin(){
    this.router.navigateByUrl('/login');
  }

  cadastrar(){
    this.loginService.cadastrar(this.cadastroForm.value).subscribe((response)=>{
      this.router.navigateByUrl('/login');
    });
  }
}
