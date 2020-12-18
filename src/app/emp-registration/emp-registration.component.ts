import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ServiceService} from '../common/service.service';


@Component({
  selector: 'app-emp-registration',
  templateUrl: './emp-registration.component.html',
  styleUrls: ['./emp-registration.component.css']
})
export class EmpRegistrationComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  empList=[];
  updateIndex=-1;
  loader=false;
  minDate = new Date(2000, 0, 1);
  maxDate;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private _snackBar:MatSnackBar,
    private service:ServiceService
  )
  {
      this.init();

  } 

 init()
  {

    this.empList=JSON.parse(localStorage.getItem('empList'));


    const today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    this.form = this.formBuilder.group({
      fullName: [null, [Validators.required, Validators.minLength(2)]],
      position: [null, [Validators.required]],
      about: [null, [Validators.required]],
      joiningDate: [null, [Validators.required]]
    });

   this.activatedRoute.queryParams.subscribe(
        result=>{
                  console.log('q result',result);
                  if(result.value === 'true')
                    {
                      this.updateIndex=+result.id;
                      this.setFormValue(this.empList[this.updateIndex]);
                    }
              }
         );
 }

  ngOnInit() {
  }


  get formControl() {
    return this.form.controls;
  }

   setFormValue(data){
     this.form.patchValue({
         fullName:data.fullName,
         position:data.position,
         about:data.about,
         joiningDate:new Date(data.joiningDate),
     })
   }


  submit() {
    this.submitted = true;
    console.log('form', this.form);

    if (this.form.invalid) {
      return;
    }
    this.loader=true;
    console.log('form', this.form.value);
    this.form.value.joiningDate = new Date(this.form.value.joiningDate).toString();
    const oldValue = localStorage.getItem('empList');
    if (oldValue) {
      const value = JSON.parse(oldValue);
      if (this.updateIndex >-1) {
          //update the employee
          value[this.updateIndex]=this.form.value;
          this.service.openSnackBar("Employee Updated Successfully");
          
           
      }
      else{
        value.push(this.form.value);
        this.service.openSnackBar("Employee added Successfully");
        
      }
      localStorage.removeItem('empList');
      localStorage.setItem('empList', JSON.stringify(value));
      setTimeout(()=>{
              this.loader=false;
              this.router.navigate(['/employee/list']);
              },3000)
      


    } else {
    //add new employee
      const value = [];
      value.push(this.form.value);
      localStorage.setItem('empList', JSON.stringify(value));
      setTimeout(()=>{
              this.loader=false;
               this.router.navigate(['/employee/list']);  
           },3000)
      this.service.openSnackBar("Employee added Successfully");

    }
  }



}
