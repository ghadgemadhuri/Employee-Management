import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from './../utility/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  empList = [];
  constructor(
    private router:Router,
    private dialog:MatDialog

  ) {
    this.empList = JSON.parse(localStorage.getItem('empList'));
    console.log('emp', this.empList);

  }

  ngOnInit() {
  }

  deleteEmp(index) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      height: '170px',
      data:{name:this.empList[index].fullName}
    });
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);

      if (result){
         this.empList.splice(index, 1);
         console.log('emp delete', this.empList, index);

         localStorage.removeItem('empList');
         localStorage.setItem('empList', JSON.stringify(this.empList));

      }
    });
  }

   editEmp(index){
        this.router.navigate(['/employee/register'],{queryParams:{value:true,id:index}});

     }

   s
   

}
