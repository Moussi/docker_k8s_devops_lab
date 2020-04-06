import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { 

                this.route.params.subscribe((params) => {
                  if(params['registred'] === 'true'){
                    this.notifyMessage = 'You are successfully registred!! you can login now with '+params['email']+'!!!!'
                  }
                })

              }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, 
                   Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isValidForm(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid && 
           (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  isMatch(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.pattern
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (token) => {
        console.log(token)
        this.router.navigate(['/rentals']);
      },
      (errorResponse) => { this.errors = errorResponse.error.errors; }
    )
  }

}
