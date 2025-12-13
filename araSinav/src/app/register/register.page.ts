import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Authentication } from '../authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  userValue: any;

  uyelikBilgisi!: FormGroup;

  constructor(private router: Router, private authentication: Authentication, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.uyelikBilgisi = this.formBuilder.group({
      firstName: ['Muhammad', [Validators.required, Validators.minLength(2)]],
      lastName: ['Ovi', [Validators.required, Validators.minLength(2)]],
      age: [250, [Validators.required, Validators.pattern("^[0-9]*$")]]
    })
  }


  get firstName() {
    return this.uyelikBilgisi.get('firstName') as FormControl;
  }
  get lastName() {
    return this.uyelikBilgisi.get('lastName') as FormControl;
  }
  get age() {
    return this.uyelikBilgisi.get('age') as FormControl;
  }

  register() {
    this.authentication.register(this.uyelikBilgisi.value).subscribe(
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
