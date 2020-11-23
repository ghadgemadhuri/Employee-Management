import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-registration',
  templateUrl: './emp-registration.component.html',
  styleUrls: ['./emp-registration.component.css']
})
export class EmpRegistrationComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  minDate = new Date(2000, 0, 1);
  maxDate;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    const today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    this.form = this.formBuilder.group({
      fullName: [null, [Validators.required, Validators.minLength(2)]],
      position: [null, [Validators.required]],
      about: [null, [Validators.required]],
      joiningDate: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get formControl() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    console.log('form', this.form);

    if (this.form.invalid) {
      return;
    }

    console.log('form', this.form.value);
    this.form.value.joiningDate = new Date(this.form.value.joiningDate).toString();
    const oldValue = localStorage.getItem('empList');
    if (oldValue) {
      const value = JSON.parse(oldValue);
      value.push(this.form.value);
      localStorage.removeItem('empList');
      localStorage.setItem('empList', JSON.stringify(value));
      this.router.navigate(['/employee/list']);

    } else {
      const value = [];
      value.push(this.form.value);
      localStorage.setItem('empList', JSON.stringify(value));
      this.router.navigate(['/employee/list']);

    }
  }

}
