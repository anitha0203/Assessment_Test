import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  passwordsMatching: boolean = false;
  isConfirmPasswordDirty: boolean = false;
  confirmPasswordClass: string = 'form-control';
  mess = ''

  constructor(private service: UtilService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      qualification: ['', Validators.required],
      passedout: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm.controls['cpassword'].valueChanges.subscribe((val) => {
      if (this.signupForm.controls['password'].value === val) {
        this.passwordsMatching = true;
        this.confirmPasswordClass = 'form-control is-valid';
      } else {
        this.passwordsMatching = false;
        this.confirmPasswordClass = 'form-control is-invalid'
      }
    })
  }


  signupFormSubmit() {
    if (this.signupForm.valid) {

      this.service.checkEmail(this.signupForm.value).subscribe(res => {
        var d = JSON.parse(JSON.stringify(res))
        if (d.exists == false) {
          this.service.signup(this.signupForm.value).subscribe(res => {
            this.route.navigate(['login'])
          },
            (error: HttpErrorResponse) => {
              this.mess = error.message
              console.log(error.message);
            });
        } else {
          this.mess = 'Email is already exists'
        }
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
    }
  }
}
