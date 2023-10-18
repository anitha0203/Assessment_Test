import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  signinForm!: FormGroup;
  mess = ''

  constructor(private service: UtilService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  formSubmit() {
    this.mess = ''
    if (this.signinForm.valid) {
      this.service.signin(this.signinForm.value).subscribe(res1 => {
        this.service.checkTest(this.signinForm.value.email).subscribe(res => {
          var response = JSON.parse(JSON.stringify(res))
          if (response.message == 'Attempted') {
            this.signinForm.reset();
            alert('You already attempted the test')
          } else {
            var response1 = JSON.parse((res1))
            if (response1.role == 'User') {
              this.service.saveToken(response1.token);
              localStorage.setItem('role', 'User')
              this.route.navigate(['instructions'])
            } else {
              this.service.saveToken(response1.token);
              localStorage.setItem('role', 'Admin')
              this.route.navigate(['admin'])
            }
          }
        },
          (error: HttpErrorResponse) => {
            console.log(error);
          });
      },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.mess = 'Wrong Credentials'
        });
    }

  }
}
