import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {ServiceService} from  '../common/service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
submitted=false;
 constructor(private formBuilder: FormBuilder,private router: Router,private service:ServiceService) { }

  ngOnInit() {

  this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required,Validators.minLength(2)]],
  });

}


 get formControl() {
    return this.loginForm.controls;
  }

login(){
	this.submitted = true;
    console.log('form', this.loginForm);

    if (this.loginForm.invalid) {
      return;
    }

    if(this.loginForm.value.username==="admin" && this.loginForm.value.password==="admin@123"){
				this.router.navigate(['/employee/register'])
	}
	else{

		this.service.openSnackBar("username or password  not valid");
	}
}
}