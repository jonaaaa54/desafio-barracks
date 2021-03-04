import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  invalidLogIn: boolean = false;

  credentials = new FormGroup({
    mail: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required)
  });

  constructor(private router: Router,
   private authService: AuthService) { }

  ngOnInit(): void {}

  signIn(): void{

      this.authService.logIn(this.credentials)
      .subscribe(
        result =>{
          if(result)
            this.router.navigate(['account/data']);

      },
        (error: Response ) =>{

            Swal.fire({
              icon: 'error',
              title: 'Oops, algo ha pasado',
              text: 'tipo de status entregado: '+ error.status +' '+ error.statusText
            });


        });

  }


  //Get methods, to validate form
  get mail(){
    return this.credentials.get('mail');
  }
  get password(){
    return this.credentials.get('password');
  }

}
