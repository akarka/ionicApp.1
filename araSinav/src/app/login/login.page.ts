import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Authentication } from '../authentication';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  userValue: any;

  uyelikBilgisi!: FormGroup;

  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,}$/;

  constructor(private router: Router, private authentication: Authentication, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.uyelikBilgisi = this.formBuilder.group({
      username: ['emilys', [Validators.required]],
      password: ['emilyspass', [Validators.required]]
    })

  }

  get username() {
    return this.uyelikBilgisi.get('username') as FormControl;
  }

  get password() {
    return this.uyelikBilgisi.get('password') as FormControl;
  }

  login() {
    this.authentication.login(this.uyelikBilgisi.value).subscribe(
      (res: any) => {
        this.userValue = res;
        console.log(this.userValue);
        this.authentication.setName(this.userValue.token);
        this.router.navigateByUrl('/home');

      },
      (err: any) => {
        this.authentication.presentAlert('Hata', err.error.error);
        console.log(err.error.error);
      }
    )
  }

}
