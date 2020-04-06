import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  dataForm: any = {};
  errors: any[] = [];
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.dataForm).subscribe(
      (res) => { 
        res.email = this.dataForm.email;
        this.router.navigate(['/login', res]); },
      (errorResponse) => {
        this.errors = errorResponse.error.errors; }
    )
  }

}
